// ⚠️ Footer component created by chatgpt
import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaGlobe,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-6">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-semibold tracking-[0.25em]">
              MONARCH
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-400">
              Timeless menswear inspired by the Old Money aesthetic.
              Crafted for gentlemen who value elegance over trends.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-3 text-lg font-medium">
              Shop
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Shirts
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Blazers
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Trousers
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Accessories
                </Link>
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-lg font-medium">
              Support
            </h3>

            <ul className="space-y-2 text-sm text-gray-400">

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Shipping
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Returns
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white duration-300">
                  Privacy Policy
                </Link>
              </li>

            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-2 text-lg font-medium">
              Follow Us
            </h3>

            <p className="text-sm text-gray-400 leading-7">
              Join our community and stay updated with new collections.
            </p>

            <div className="mt-3 flex gap-4">

              <Link
                href="https://x.com/realpakninja"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-white hover:bg-white hover:text-black"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="https://www.instagram.com/muhammadkhizer80"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-white hover:bg-white hover:text-black"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="https://linkedin.com/in/khizer-ishtiaq"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-white hover:bg-white hover:text-black"
              >
                <FaLinkedinIn size={18} />
              </Link>

              <Link
                href="https://github.com/khizer-369"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-white hover:bg-white hover:text-black"
              >
                <FaGithub size={18} />
              </Link>

              <Link
                href="https://khizer.dev"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 transition hover:border-white hover:bg-white hover:text-black"
              >
                <FaGlobe size={18} />
              </Link>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;