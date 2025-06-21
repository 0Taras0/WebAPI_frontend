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