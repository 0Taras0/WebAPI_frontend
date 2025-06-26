export interface ICategoryItem {
    id: string;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryCreate {
    name: string;
    slug: string;
    imageFile: File | null;
}

export interface ICategoryEdit {
    id: string;
    name: string;
    slug: string;
    imageFile: File | null;
}

export interface IRegister
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile: string;
}

export interface ServerError {
    status: number;
    data: {
        errors: Record<string, string[]>;
    };
}

export interface CategoryItemModel {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ProductSizeModel {
    id: number;
    name: string;
}

export interface ProductIngredientModel {
    id: number;
    name: string;
    image: string;
}

export interface ProductImageModel {
    id: number;
    name: string;
    priority: number;
}

export interface ProductItemModel {
    id: number;
    name: string;
    slug: string;
    price: number;
    weight: number;
    category?: CategoryItemModel;
    productSize?: ProductSizeModel;
    productIngredients?: ProductIngredientModel[];
    productImages?: ProductImageModel[];
}

export interface IProductCreate {
    name: string;
    slug: string;
    price: number;
    weight: number;
    categoryId: number;
    productSizeId: number;
    ingredientIds?: number[];
    imageFiles?: File[];
}
