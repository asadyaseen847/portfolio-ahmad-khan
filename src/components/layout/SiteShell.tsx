import Nav from "./Nav";
import Footer from "./Footer";

/** Standard site chrome (neon theme): sticky nav + footer around page content. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
