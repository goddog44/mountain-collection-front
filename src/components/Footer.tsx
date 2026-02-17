import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="w-full border-t border-muted">
        {/* Section Newsletter */}
        <div>
          <div className="w-full md:[width:768px] lg:[width:1024px] xl:[width:1216px] mx-auto max-md:px-4 max-md:py-4 md:p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h2 className="h3 font-bold">Recevez nos actus et nos bons plans ski</h2>
                <p className="mid-text-display mid-grey font-md opacity-90">
                  Offres, actus et bons plans ski, directement dans votre boîte mail.
                </p>
              </div>
              <div>
                <form className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <div className="flex-grow relative">
                      <input
                        type="email"
                        id="newsletter-email"
                        placeholder=" "
                        className="peer w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-400 focus:ring-0"
                      />
                      <label
                        htmlFor="newsletter-email"
                        className="absolute left-4 top-3 text-sm text-gray-500 transition-all duration-200 opacity-70
                                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-black font-md
                                    peer-[:not(:placeholder-shown)]:top-[1px] peer-[:not(:placeholder-shown)]:top-[-20px]"
                      >
                        Votre adresse email
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="rounded-lg border-2 border-gray-900 bg-white px-6 py-3 text-sm font-bold transition-colors hover:bg-gray-50 max-md:w-full md:whitespace-nowrap"
                      >
                        S&apos;inscrire
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-success">&nbsp;</div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Colonnes du footer */}
        <div>
          <div className="w-full md:[width:768px] lg:[width:1024px] xl:[width:1216px] mx-auto max-md:px-4 max-md:py-4 md:p-4 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Suivez nous */}
              <div className="text-sm md:row-span-2">
                <div className="font-bold mb-1">Suivez nous</div>
                <div className="">
                  <div className="inline mr-1">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent p-1"
                    >
                      <a
                        href="https://www.instagram.com/mountaincollection_immobilier/"
                        rel="noopener noreferrer"
                        target="_blank"
                        alt="Instagram"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 5C7.20435 5 6.44129 5.31607 5.87868 5.87868C5.31607 6.44129 5 7.20435 5 8V16C5 16.7956 5.31607 17.5587 5.87868 18.1213C6.44129 18.6839 7.20435 19 8 19H16C16.7956 19 17.5587 18.6839 18.1213 18.1213C18.6839 17.5587 19 16.7956 19 16V8C19 7.20435 18.6839 6.44129 18.1213 5.87868C17.5587 5.31607 16.7956 5 16 5H8ZM4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V16C21 17.3261 20.4732 18.5979 19.5355 19.5355C18.5979 20.4732 17.3261 21 16 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M16.5 6.5C17.0523 6.5 17.5 6.94772 17.5 7.5V7.51C17.5 8.06228 17.0523 8.51 16.5 8.51C15.9477 8.51 15.5 8.06228 15.5 7.51V7.5C15.5 6.94772 15.9477 6.5 16.5 6.5Z" fill="#191919"/>
                        </svg>
                      </a>
                    </button>
                  </div>
                  <div className="inline mr-1">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent p-1"
                    >
                      <a
                        href="https://www.facebook.com/mountaincollection.immo"
                        rel="noopener noreferrer"
                        target="_blank"
                        alt="Facebook"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.7574 3.75736C11.8826 2.63214 13.4087 2 15 2H18C18.5523 2 19 2.44772 19 3V7C19 7.55228 18.5523 8 18 8H15V9H18C18.3079 9 18.5987 9.14187 18.7882 9.38459C18.9777 9.6273 19.0448 9.94379 18.9701 10.2425L17.9701 14.2425C17.8589 14.6877 17.4589 15 17 15H15V21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V15H7C6.44772 15 6 14.5523 6 14V10C6 9.44772 6.44772 9 7 9H9V8C9 6.4087 9.63214 4.88258 10.7574 3.75736ZM15 4C13.9391 4 12.9217 4.42143 12.1716 5.17157C11.4214 5.92172 11 6.93913 11 8V10C11 10.5523 10.5523 11 10 11H8V13H10C10.5523 13 11 13.4477 11 14V20H13V14C13 13.4477 13.4477 13 14 13H16.2192L16.7192 11H14C13.4477 11 13 10.5523 13 10V8C13 7.46957 13.2107 6.96086 13.5858 6.58579C13.9609 6.21071 14.4696 6 15 6H17V4H15Z" fill="#191919"/>
                        </svg>
                      </a>
                    </button>
                  </div>
                  <div className="inline mr-1">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent p-1"
                    >
                      <a
                        href="https://www.linkedin.com/company/mountain-collection-immobilier/"
                        rel="noopener noreferrer"
                        target="_blank"
                        alt="LinkedIn"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7">
                          <path fillRule="evenodd" clipRule="evenodd" d="M6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V18C5 18.2652 5.10536 18.5196 5.29289 18.7071C5.48043 18.8946 5.73478 19 6 19H18C18.2652 19 18.5196 18.8946 18.7071 18.7071C18.8946 18.5196 19 18.2652 19 18V6C19 5.73478 18.8946 5.48043 18.7071 5.29289C18.5196 5.10536 18.2652 5 18 5H6ZM3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7957 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7957 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 10C8.55228 10 9 10.4477 9 11V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16V11C7 10.4477 7.44772 10 8 10Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 7C8.55228 7 9 7.44772 9 8V8.01C9 8.56228 8.55228 9.01 8 9.01C7.44772 9.01 7 8.56228 7 8.01V8C7 7.44772 7.44772 7 8 7Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11C11 10.4477 11.4477 10 12 10Z" fill="#191919"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M11.8787 10.8787C12.4413 10.3161 13.2043 10 14 10C14.7957 10 15.5587 10.3161 16.1213 10.8787C16.6839 11.4413 17 12.2043 17 13V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12C13.7348 12 13.4804 12.1054 13.2929 12.2929C13.1054 12.4804 13 12.7348 13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.2043 11.3161 11.4413 11.8787 10.8787Z" fill="#191919"/>
                        </svg>
                      </a>
                    </button>
                  </div>
                </div>
              </div>

              {/* Nos espaces */}
              <div className="text-sm">
                <div className="font-bold mb-1">Nos espaces</div>
                <div className="max-sm:grid max-sm:grid-cols-2">
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://resa.alpes-skiresa.com/mountaincollection/fr-FR/Account/Login?ReturnUrl=~%2Ffr-FR%2FOwner"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Espace propriétaire"
                        >
                          Espace propriétaire
                        </a>
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://mountaincollection.monespaceclient.immo/"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Espace Syndic"
                        >
                          Espace Syndic
                        </a>
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://resa.alpes-skiresa.com/mountaincollection/fr-FR/Account/Login?ReturnUrl=~%2Ffr-FR%2FTourOperator"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Espace TO"
                        >
                          Espace TO
                        </a>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Groupe compagnie des alpes */}
              <div className="text-sm">
                <div className="font-bold mb-1">Groupe compagnie des alpes</div>
                <div className="max-sm:grid max-sm:grid-cols-2">
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://compagniedesalpes.softy.pro/offres?subsidiaries%5B%5D=3641&contracts%5B%5D=1"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Recrutement CDI"
                        >
                          Recrutement CDI
                        </a>
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://compagniedesalpes.softy.pro/offres?subsidiaries%5B%5D=3641&contracts%5B%5D=2&contracts%5B%5D=4&contracts%5B%5D=5&contracts%5B%5D=6"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Recrutement Saisonniers"
                        >
                          Recrutement Saisonniers
                        </a>
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://travelski.com"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="Travelski"
                        >
                          Travelski
                        </a>
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent px-0 py-1.5"
                    >
                      <span className="mid-grey text-xs">
                        <a
                          href="https://mmv.fr"
                          rel="noopener noreferrer"
                          target="_blank"
                          alt="MMV"
                        >
                          MMV
                        </a>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liens légaux */}
        <div>
          <div id="footer-links-mini" className="p-4 flex flex-row justify-center flex-wrap">
            <div>
              <a
                href="https://media.mountaincollection.com/upload/mentions-legales.pdf"
                rel="noopener noreferrer"
                target="_blank"
                alt="Mentions légales"
              >
                <button
                  type="button"
                  className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center px-2.5 text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent py-0"
                >
                  <span className="truncate mid-grey font-medium text-xs">Mentions légales</span>
                </button>
              </a>
            </div>
            <div>
              <Link href="/fr/cgv" alt="Conditions générales de ventes">
                <button
                  type="button"
                  className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center px-2.5 text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent py-0"
                >
                  <span className="truncate mid-grey font-medium text-xs">
                    Conditions générales de ventes
                  </span>
                </button>
              </Link>
            </div>
            <div>
              <Link href="/fr/confidentialite" alt="Confidentialité">
                <button
                  type="button"
                  className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center px-2.5 text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent py-0"
                >
                  <span className="truncate mid-grey font-medium text-xs">Confidentialité</span>
                </button>
              </Link>
            </div>
            <div>
              <a
                href="javascript:Didomi.preferences.show();"
                rel="noopener noreferrer"
                target="_self"
                alt="Gestion des cookies"
              >
                <button
                  type="button"
                  className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors ring-neutral justify-center px-2.5 text-sm gap-1.5 text-default active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent hover:bg-transparent py-0"
                >
                  <span className="truncate mid-grey font-medium text-xs">Gestion des cookies</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
