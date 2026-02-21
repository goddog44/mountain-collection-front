"""
Facebook Page Image Scraper - Version 5
=========================================
- Connexion manuelle
- Mode DIAGNOSTIC pour voir ce que Selenium trouve vraiment
- Sélecteurs robustes + sauvegarde HTML pour debug
"""

import re
import time
import json
import requests
from pathlib import Path
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException, StaleElementReferenceException

# ─────────────────────────────────────────────
# ⚙️  CONFIGURATION
# ─────────────────────────────────────────────
PAGE_URL          = "https://www.facebook.com/people/%C3%89tape-Pierre-bleue-multi-services/61573770819121/"
OUTPUT_DIR        = "./facebook_images"
MAX_POSTS         = 200
SCROLL_PAUSE      = 4.0
MAX_SCROLL_NO_NEW = 10
MAX_FILENAME_LEN  = 100

# Mode diagnostic : affiche ce que Selenium voit et sauvegarde le HTML
DIAGNOSTIC = True

CHROMEDRIVER_PATH = r"C:\Users\Admin\Downloads\www.mountaincollection.com\app\mountain-collection-front\chromedriver.exe"
# ─────────────────────────────────────────────

NOISE_PATTERNS = [
    r"^j'aime$", r"^like$", r"^commenter?$", r"^comment$",
    r"^partager$", r"^share$", r"^voir plus$", r"^see more$",
    r"^voir moins$", r"^see less$", r"^réagir$", r"^suivre$",
    r"^follow$", r"^\d+$", r"^il y a \d+", r"^\d+ (min|h|j|d|w|s)",
    r"^·$", r"^\.$", r"^…$", r"^e…$",
]

def is_noise(line: str) -> bool:
    l = line.lower().strip()
    if len(l) < 6:
        return True
    return any(re.match(p, l) for p in NOISE_PATTERNS)

def sanitize_folder_name(text: str, max_len: int = MAX_FILENAME_LEN) -> str:
    if not text or text.strip() == "":
        return f"post_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    text = re.sub(r'[\\/*?:"<>|]', '', text)
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) > max_len:
        text = text[:max_len].rsplit(' ', 1)[0].strip()
    return text or "post_sans_titre"

def make_unique_folder(base_path: Path, name: str) -> Path:
    folder = base_path / name
    counter = 1
    while folder.exists():
        folder = base_path / f"{name}_{counter}"
        counter += 1
    folder.mkdir(parents=True, exist_ok=True)
    return folder

def download_image(url: str, dest_folder: Path, index: int) -> bool:
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://www.facebook.com/"
        }
        resp = requests.get(url, headers=headers, timeout=20)
        resp.raise_for_status()
        content_type = resp.headers.get("Content-Type", "image/jpeg")
        ext = content_type.split("/")[-1].split(";")[0].strip()
        if ext not in ("jpeg", "jpg", "png", "gif", "webp"):
            ext = "jpg"
        filepath = dest_folder / f"image_{index:03d}.{ext}"
        filepath.write_bytes(resp.content)
        print(f"    ✅ Image {index} → {filepath.name}")
        return True
    except Exception as e:
        print(f"    ❌ Erreur image {index}: {e}")
        return False

def setup_driver() -> webdriver.Chrome:
    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument("--window-size=1440,900")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
    )
    service = Service(executable_path=CHROMEDRIVER_PATH)
    driver = webdriver.Chrome(service=service, options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

def wait_for_manual_login(driver):
    print("\n" + "="*60)
    print("  🔐 CONNEXION MANUELLE REQUISE")
    print("="*60)
    print("  1. Chrome vient de s'ouvrir sur facebook.com/login")
    print("  2. Connecte-toi à Facebook dans cette fenêtre")
    print("  3. Attends d'être sur ton fil d'actualité")
    print("  4. Reviens ici et appuie sur ENTRÉE")
    print("="*60)
    driver.get("https://www.facebook.com/login")
    time.sleep(2)
    input("\n  ⏳ Appuie sur ENTRÉE une fois connecté... ")
    print("  ✅ OK! Lancement du scraping...\n")
    time.sleep(3)

def diagnostic(driver):
    """Affiche ce que Selenium voit sur la page et sauvegarde le HTML."""
    print("\n" + "="*60)
    print("  🔍 MODE DIAGNOSTIC")
    print("="*60)

    url = driver.current_url
    title = driver.title
    print(f"  URL actuelle : {url}")
    print(f"  Titre page   : {title}")

    # Compte les éléments clés
    tests = [
        ("FeedUnit (data-pagelet)",   "//div[@data-pagelet='FeedUnit']"),
        ("role=article",              "//div[@role='article']"),
        ("role=feed",                 "//div[@role='feed']"),
        ("Images fbcdn",              "//img[contains(@src,'scontent') or contains(@src,'fbcdn')]"),
        ("Images (toutes)",           "//img"),
        ("div dir=auto",              "//div[@dir='auto']"),
        ("span dir=auto",             "//span[@dir='auto']"),
        ("Bouton Se connecter",       "//button[contains(.,'Connecter') or contains(.,'Log In')]"),
        ("Mur de connexion",          "//div[contains(@class,'login') or @id='login']"),
    ]

    print("\n  Éléments trouvés sur la page :")
    for label, xpath in tests:
        try:
            els = driver.find_elements(By.XPATH, xpath)
            count = len(els)
            status = "✅" if count > 0 else "❌"
            print(f"    {status} {label:35s} : {count}")
        except Exception as e:
            print(f"    ❓ {label:35s} : erreur ({e})")

    # Sauvegarde le HTML pour inspection manuelle
    try:
        html = driver.page_source
        html_path = Path("./debug_page.html")
        html_path.write_text(html, encoding="utf-8")
        print(f"\n  💾 HTML sauvegardé → {html_path.absolute()}")
        print(f"     (Ouvre ce fichier dans un éditeur pour voir la structure)")
    except Exception as e:
        print(f"  ⚠️  Impossible de sauvegarder le HTML: {e}")

    print("="*60 + "\n")

def is_valid_image_url(src: str) -> bool:
    if not src or not src.startswith("https://"):
        return False
    if not any(x in src for x in ["scontent", "fbcdn.net", "fbsbx.com"]):
        return False
    bad = ["emoji", "rsrc.php", "1x1", "pixel", "/ads/", "safe_image"]
    return not any(x in src for x in bad)

def get_description(driver, post_el) -> str:
    best = ""

    # Stratégie 1 : sélecteurs spécifiques
    xpaths = [
        ".//div[@data-ad-comet-preview='message']",
        ".//div[@data-ad-preview='message']",
        ".//div[@dir='auto'][not(ancestor::*[@role='button'])][not(ancestor::header)]",
        ".//span[@dir='auto'][not(ancestor::*[@role='button'])]",
    ]
    for xpath in xpaths:
        try:
            for el in post_el.find_elements(By.XPATH, xpath):
                t = el.text.strip()
                lines = [l.strip() for l in t.split('\n') if l.strip() and not is_noise(l)]
                clean = ' '.join(lines).strip()
                if len(clean) > len(best):
                    best = clean
            if len(best) > 20:
                break
        except Exception:
            pass

    if len(best) > 20:
        return best

    # Stratégie 2 : JS innerText
    try:
        result = driver.execute_script("""
            var post = arguments[0];
            var candidates = post.querySelectorAll('div[dir="auto"], span[dir="auto"]');
            var best = '';
            for (var i = 0; i < candidates.length; i++) {
                var el = candidates[i];
                var skip = false;
                var p = el.parentElement;
                while (p && p !== post) {
                    if (p.getAttribute('role') === 'button' || p.tagName === 'HEADER') {
                        skip = true; break;
                    }
                    p = p.parentElement;
                }
                if (!skip) {
                    var text = (el.innerText || '').trim();
                    if (text.length > best.length) best = text;
                }
            }
            return best;
        """, post_el)
        if result:
            lines = [l.strip() for l in result.split('\n') if l.strip() and not is_noise(l)]
            clean = ' '.join(lines).strip()
            if len(clean) > len(best):
                best = clean
    except Exception:
        pass

    # Stratégie 3 : texte brut
    if len(best) < 20:
        try:
            raw = post_el.text.strip()
            lines = [l.strip() for l in raw.split('\n') if l.strip() and not is_noise(l)]
            if lines:
                candidate = ' '.join(lines[:6])
                if len(candidate) > len(best):
                    best = candidate
        except Exception:
            pass

    # Nettoie "See more / Voir plus"
    best = re.sub(r'\s*[…\.]{0,3}\s*(See more|Voir plus|E…|…)\s*$', '', best, flags=re.IGNORECASE).strip()
    return best

def collect_post_elements(driver) -> list:
    """Collecte tous les éléments qui ressemblent à des posts."""
    elements = []

    # Méthode 1 : FeedUnit
    try:
        els = driver.find_elements(By.XPATH, "//div[@data-pagelet='FeedUnit']")
        if els:
            elements.extend(els)
    except Exception:
        pass

    # Méthode 2 : role=article
    try:
        els = driver.find_elements(By.XPATH, "//div[@role='article']")
        if els:
            elements.extend(els)
    except Exception:
        pass

    # Méthode 3 : cherche le feed et ses enfants directs
    try:
        feed = driver.find_element(By.XPATH, "//div[@role='feed']")
        children = driver.execute_script("""
            var feed = arguments[0];
            return Array.from(feed.children);
        """, feed)
        if children:
            elements.extend(children)
    except Exception:
        pass

    # Méthode 4 : remonter depuis les images
    try:
        imgs = driver.find_elements(By.XPATH,
            "//img[contains(@src,'scontent') or contains(@src,'fbcdn')]"
        )
        seen_ids = set()
        for img in imgs[:30]:  # Limite pour la performance
            el = img
            for _ in range(15):
                try:
                    el = driver.execute_script("return arguments[0].parentElement;", el)
                    if el is None:
                        break
                    # Vérifie la hauteur — un vrai post fait > 200px
                    h = driver.execute_script("return arguments[0].offsetHeight;", el)
                    # Vérifie s'il a du texte (description)
                    has_text = driver.execute_script(
                        "return (arguments[0].innerText || '').length > 20;", el
                    )
                    if h and h > 200 and has_text:
                        uid = driver.execute_script(
                            "return arguments[0].dataset.pagelet || arguments[0].id || '';", el
                        )
                        if uid not in seen_ids:
                            seen_ids.add(uid)
                            elements.append(el)
                        break
                except Exception:
                    break
    except Exception:
        pass

    return elements

def scroll_and_extract(driver) -> list:
    posts_data = []
    seen_keys = set()
    no_new_count = 0

    print("📜 Extraction en cours...\n")
    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        post_elements = collect_post_elements(driver)

        if DIAGNOSTIC and not posts_data:
            print(f"  [DEBUG] {len(post_elements)} éléments candidats trouvés")

        new_found = 0

        for post_el in post_elements:
            try:
                imgs = post_el.find_elements(By.TAG_NAME, "img")
                images = []
                for img in imgs:
                    try:
                        src = img.get_attribute("src") or ""
                        if is_valid_image_url(src):
                            images.append(src)
                    except StaleElementReferenceException:
                        pass

                images = list(dict.fromkeys(images))
                if not images:
                    continue

                key = images[0][:120]
                if key in seen_keys:
                    continue
                seen_keys.add(key)

                description = get_description(driver, post_el)

                posts_data.append({"description": description, "images": images})
                new_found += 1

                preview = description[:85] if description else "⚠️  AUCUN TEXTE"
                print(f"  📦 Post #{len(posts_data)}: {len(images)} img | 📝 '{preview}'")

                if MAX_POSTS and len(posts_data) >= MAX_POSTS:
                    print(f"\n✅ Limite de {MAX_POSTS} posts atteinte.")
                    return posts_data

            except StaleElementReferenceException:
                continue
            except Exception:
                continue

        if new_found == 0:
            no_new_count += 1
            print(f"  ⏳ Scroll sans nouveau post ({no_new_count}/{MAX_SCROLL_NO_NEW})")
        else:
            no_new_count = 0
            print(f"  ✨ +{new_found} post(s) | Total: {len(posts_data)}")

        if no_new_count >= MAX_SCROLL_NO_NEW:
            print("🏁 Fin — plus de nouveaux posts.")
            break

        driver.execute_script("window.scrollBy(0, window.innerHeight * 1.5);")
        time.sleep(SCROLL_PAUSE)

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height and no_new_count >= 4:
            print("🏁 Bas de page atteint.")
            break
        last_height = new_height

    return posts_data

def save_posts(posts: list, output_dir: str):
    base = Path(output_dir)
    base.mkdir(parents=True, exist_ok=True)

    print(f"\n💾 Sauvegarde de {len(posts)} posts → '{output_dir}'")
    summary = []

    for i, post in enumerate(posts, 1):
        description = post.get("description", "").strip()
        images      = post.get("images", [])

        folder_name = sanitize_folder_name(description) if description else f"post_{i:03d}_sans_description"
        folder = make_unique_folder(base, folder_name)
        print(f"\n📁 [{i}/{len(posts)}] {folder.name}")

        downloaded = 0
        for j, img_url in enumerate(images, 1):
            if download_image(img_url, folder, j):
                downloaded += 1
            time.sleep(0.4)

        (folder / "description.txt").write_text(
            description if description else "(aucune description)",
            encoding="utf-8"
        )
        summary.append({
            "num": i,
            "dossier": folder.name,
            "images_telechargees": downloaded,
            "description": description
        })

    report_path = base / "_rapport.json"
    report_path.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")

    total = sum(p["images_telechargees"] for p in summary)
    print(f"\n{'='*60}")
    print(f"✅ TERMINÉ!")
    print(f"   📁 Dossiers créés      : {len(summary)}")
    print(f"   🖼️  Images téléchargées : {total}")
    print(f"   📄 Rapport             : {report_path}")
    print(f"{'='*60}")

def main():
    print("=" * 60)
    print("  🖼️  Facebook Page Image Scraper v5")
    print("=" * 60)

    driver = setup_driver()

    try:
        wait_for_manual_login(driver)

        print(f"🌐 Chargement de la page cible...")
        driver.get(PAGE_URL)
        time.sleep(6)  # Attente plus longue pour le chargement initial

        # Ferme les popups
        for xpath in [
            "//div[@aria-label='Fermer']", "//div[@aria-label='Close']",
            "//button[@aria-label='Fermer']", "//button[@aria-label='Close']",
        ]:
            try:
                driver.find_element(By.XPATH, xpath).click()
                time.sleep(1)
                break
            except NoSuchElementException:
                pass

        # DIAGNOSTIC : affiche ce que Selenium voit
        if DIAGNOSTIC:
            diagnostic(driver)

            # Pause pour lire le diagnostic avant de continuer
            input("  📋 Lis le diagnostic ci-dessus puis appuie sur ENTRÉE pour continuer... ")

        posts = scroll_and_extract(driver)

        if not posts:
            print("\n⚠️  Aucun post trouvé.")
            print("   → Regarde le fichier debug_page.html pour voir ce que Facebook affiche")
            print("   → Si tu vois 'Connecte-toi' dans le HTML, la session a expiré")
            return

        save_posts(posts, OUTPUT_DIR)

    finally:
        driver.quit()

if __name__ == "__main__":
    main()