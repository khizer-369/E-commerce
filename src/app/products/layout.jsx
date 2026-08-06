import NavBar from "@/components/NavBar";
import BlankSpace from "@/components/BlankSpace";
import Footer from "@/components/Footer";
import ProductContext from "@/context/ProductContext";

const layout = ({ children }) => {
    return (
        <div>
            <NavBar />
            <BlankSpace />
            <ProductContext>
                {children}
            </ProductContext>
            <Footer />
        </div>
    )
}

export default layout
