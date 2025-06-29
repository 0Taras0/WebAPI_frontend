import {Row} from 'antd';
import {useGetAllProductsQuery} from "../../../services/apiProducts.ts";
import LoadingScreen from "../../../components/ui/loading/LoadingScreen.tsx";
import ProductCard from "../../../components/ui/card/ProductCard.tsx";

export const ProductsPage: React.FC = () => {
    const {data: products, isLoading, isError} = useGetAllProductsQuery();

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    }
    if (isError) return <p>Помилка при завантаженні продуктів</p>;

    const uniqueProducts = products
        ? products.filter((product, index, self) =>
            index === self.findIndex((p) => p.slug === product.slug)
        )
        : [];

    return (
        <div style={{padding: 24}}>
            <Row gutter={[16, 16]}>
                {uniqueProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </Row>
        </div>
    );
};


export default ProductsPage