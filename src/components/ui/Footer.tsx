import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-shade-black pt-16 px-[100px] mt-16 flex flex-col">
      <div className="flex flex-col max-w-[1280px] mx-auto w-full">
        <img
          src="/logos/default2.svg"
          alt="logo-2"
          className="w-[189px] h-[54px]"
        />
        <div className="grid grid-cols-4 mt-16 pb-10 border-b border-b-secondary-100">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index + "foot"}
              className="flex flex-col items-start text-shade-white"
            >
              <h3 className="px-[10px] py-2 font-bold text-lg">
                Contactez-nous
              </h3>
              <div className="px-[10px] flex items-start flex-col">
                {Array.from({ length: 4 }).map((_, index) => (
                  <a
                    key={index + "foot-link"}
                    href="#"
                    className="text-shade-white text-sm mb-2"
                  >
                    Ceci est un lien 1
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center  text-secondary-50 py-9 justify-between">
          <div className="flex gap-x-4 items-center">
            <Link to="#" className="text-shade-white font-medium">
              Copyright © Digi guild speedrun 2024
            </Link>
            <div className="w-[1px] h-[22px] rounded-full bg-secondary-50" />
            <Link to="#" className="text-shade-white font-medium">
              Copyright © Digi guild speedrun 2024
            </Link>
            <div className="w-[1px] h-[22px] rounded-full bg-secondary-50" />
            <Link to="#" className="text-shade-white font-medium">
              Politiques de remboursement
            </Link>
          </div>
          <div className="flex gap-x-6 items-center">
            <Link className="btn" to={"#"}>
              <img src="/icons/fb.svg" alt="facebook" />
            </Link>
            <Link className="btn" to={"#"}>
              <img src="/icons/ig.svg" alt="instagram" />
            </Link>
            <Link className="btn" to={"#"}>
              <img src="/icons/x.svg" alt="twitter" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
