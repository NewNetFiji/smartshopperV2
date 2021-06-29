import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ImageInput = {
  id: Scalars['Float'];
  url: Scalars['String'];
  productId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ImageResponse = {
  __typename?: 'ImageResponse';
  errors?: Maybe<Array<FieldError>>;
  image?: Maybe<Image>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createProduct: ProductResponse;
  updateProduct?: Maybe<ProductResponse>;
  deleteProduct?: Maybe<Scalars['Boolean']>;
  registerVendor: VendorResponse;
  updateVendor?: Maybe<VendorResponse>;
  deleteVendor?: Maybe<Scalars['Boolean']>;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  deleteUser?: Maybe<Scalars['Boolean']>;
  createImage: ImageResponse;
  updateImage?: Maybe<ImageResponse>;
  deleteImage?: Maybe<Scalars['Boolean']>;
  createOrder: OrderResponse;
  ackOrder?: Maybe<OrderResponse>;
  deleteOrder?: Maybe<Scalars['Boolean']>;
};


export type MutationVoteArgs = {
  value: Scalars['Boolean'];
  productId: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  options: ProductInput;
};


export type MutationUpdateProductArgs = {
  options: ProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterVendorArgs = {
  options: VendorInput;
};


export type MutationUpdateVendorArgs = {
  options: VendorInput;
};


export type MutationDeleteVendorArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationCreateImageArgs = {
  options: ImageInput;
};


export type MutationUpdateImageArgs = {
  options: ImageInput;
};


export type MutationDeleteImageArgs = {
  id: Scalars['Float'];
};


export type MutationCreateOrderArgs = {
  order: Array<OrderDetailInput>;
};


export type MutationAckOrderArgs = {
  options: OrderHeaderInput;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Float'];
  orderTotal: Scalars['Float'];
  tax?: Maybe<Scalars['Float']>;
  customerId: Scalars['Int'];
  creatorId?: Maybe<Scalars['Int']>;
  updaterId?: Maybe<Scalars['Int']>;
  vendorId: Scalars['Int'];
  status: OrderStatus;
  deliveryAddress?: Maybe<Scalars['String']>;
  deliveryDate?: Maybe<Scalars['String']>;
  customer: User;
  creator?: Maybe<User>;
  updater?: Maybe<User>;
  vendor: Vendor;
  items?: Maybe<Array<Orderdetail>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type OrderDetailInput = {
  qty?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Float']>;
  productId?: Maybe<Scalars['Int']>;
  vendorId?: Maybe<Scalars['Int']>;
};

export type OrderHeaderInput = {
  id: Scalars['Int'];
  deliveryDate?: Maybe<Scalars['String']>;
  deliveryAddress?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<FieldError>>;
  order?: Maybe<Array<Order>>;
};

/** Tracks the status of an order */
export enum OrderStatus {
  New = 'NEW',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED',
  Delivery = 'DELIVERY',
  Review = 'REVIEW',
  Completed = 'COMPLETED',
  Deleted = 'DELETED'
}

export type Orderdetail = {
  __typename?: 'Orderdetail';
  id: Scalars['Int'];
  qty: Scalars['Int'];
  price: Scalars['Int'];
  productId: Scalars['Int'];
  orderId?: Maybe<Scalars['Float']>;
};

export type PaginatedOrders = {
  __typename?: 'PaginatedOrders';
  hasMore: Scalars['Boolean'];
  orders: Array<Order>;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  hasMore: Scalars['Boolean'];
  products: Array<Product>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  title: Scalars['String'];
  points?: Maybe<Scalars['Float']>;
  downPoints?: Maybe<Scalars['Float']>;
  voteStatus?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  productAvailableTo?: Maybe<Scalars['String']>;
  productAvailableFrom?: Maybe<Scalars['String']>;
  basePrice: Scalars['Float'];
  barcode?: Maybe<Scalars['String']>;
  packSize?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  status: Status;
  manufacturer?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  vendorId: Scalars['Int'];
  vendor: Vendor;
  images?: Maybe<Array<Image>>;
  upboats?: Maybe<Array<Upboat>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  descSnippet: Scalars['String'];
};

export type ProductInput = {
  id?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Array<Scalars['String']>>;
  productAvailableTo?: Maybe<Scalars['String']>;
  productAvailableFrom?: Maybe<Scalars['String']>;
  basePrice?: Maybe<Scalars['Float']>;
  barcode?: Maybe<Scalars['String']>;
  packSize?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  category?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
  vendorId?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  errors?: Maybe<Array<FieldError>>;
  product?: Maybe<Product>;
  images?: Maybe<Array<Image>>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  countProducts: Scalars['Int'];
  getProducts: PaginatedProducts;
  products: Array<Product>;
  product?: Maybe<Product>;
  vendor?: Maybe<Vendor>;
  getPublicVendor?: Maybe<Vendor>;
  me?: Maybe<User>;
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  getVendorOrders?: Maybe<PaginatedOrders>;
  order?: Maybe<Order>;
};


export type QueryCountProductsArgs = {
  vendorId?: Maybe<Scalars['Int']>;
};


export type QueryGetProductsArgs = {
  vendorId?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryProductsArgs = {
  vendorId?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryVendorArgs = {
  id: Scalars['Int'];
};


export type QueryImageArgs = {
  id: Scalars['Int'];
};


export type QueryImagesArgs = {
  productId: Scalars['Int'];
};


export type QueryGetVendorOrdersArgs = {
  vendorId?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryOrderArgs = {
  id: Scalars['Int'];
};

/** General Status Enum. Defined in Product entity. */
export enum Status {
  New = 'NEW',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Deleted = 'DELETED'
}

/** Type of vendor */
export enum TypeOfVendor {
  New = 'NEW',
  Admin = 'ADMIN',
  Display = 'DISPLAY',
  Trader = 'TRADER',
  Public = 'PUBLIC'
}

export type Upboat = {
  __typename?: 'Upboat';
  value: Scalars['Boolean'];
  userId: Scalars['Float'];
  productId: Scalars['Float'];
  user: User;
  product: Product;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  roles: Array<UserRole>;
  status: UserStatus;
  vendorId: Scalars['Int'];
  ordersPlaced: Array<Order>;
  ordersMade: Array<Order>;
  ordersUpdated: Array<Order>;
  vendor: Vendor;
  upboats: Array<Upboat>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

/** User Role. duhh. */
export enum UserRole {
  General = 'GENERAL',
  Admin = 'ADMIN',
  Ghost = 'GHOST',
  Super = 'SUPER',
  Data = 'DATA'
}

/** General Status Enum. */
export enum UserStatus {
  New = 'NEW',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Deleted = 'DELETED'
}

export type UsernamePasswordInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  vendorId?: Maybe<Scalars['Float']>;
};

export type Vendor = {
  __typename?: 'Vendor';
  id: Scalars['Float'];
  name: Scalars['String'];
  address: Scalars['String'];
  tin: Scalars['String'];
  image: Scalars['String'];
  status: VendorStatus;
  vendorType: TypeOfVendor;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type VendorInput = {
  id?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  tin?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  vendorType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type VendorResponse = {
  __typename?: 'VendorResponse';
  errors?: Maybe<Array<FieldError>>;
  vendor?: Maybe<Vendor>;
};

/** Tracks the status of an vendor */
export enum VendorStatus {
  New = 'NEW',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  Deleted = 'DELETED'
}

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'status' | 'roles' | 'firstName' | 'lastName' | 'vendorId'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateProductMutationVariables = Exact<{
  options: ProductInput;
}>;


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: (
    { __typename?: 'ProductResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, product?: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'productAvailableTo' | 'productAvailableFrom' | 'basePrice' | 'barcode' | 'packSize' | 'discount' | 'category' | 'status' | 'manufacturer' | 'tags'>
    )>, images?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'productId' | 'url' | 'updatedAt' | 'createdAt'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Boolean'];
  productId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type CountProductsQueryVariables = Exact<{
  vendorId?: Maybe<Scalars['Int']>;
}>;


export type CountProductsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countProducts'>
);

export type GetProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  vendorId?: Maybe<Scalars['Int']>;
}>;


export type GetProductsQuery = (
  { __typename?: 'Query' }
  & { getProducts: (
    { __typename?: 'PaginatedProducts' }
    & Pick<PaginatedProducts, 'hasMore'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Product, 'id' | 'points' | 'downPoints' | 'voteStatus' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'productAvailableTo' | 'productAvailableFrom' | 'basePrice' | 'packSize' | 'discount' | 'category' | 'status' | 'manufacturer' | 'tags' | 'vendorId'>
      & { vendor: (
        { __typename?: 'Vendor' }
        & Pick<Vendor, 'id' | 'image' | 'name'>
      ), images?: Maybe<Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'id' | 'url' | 'productId'>
      )>> }
    )> }
  ) }
);

export type GetPublicVendorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicVendorQuery = (
  { __typename?: 'Query' }
  & { getPublicVendor?: Maybe<(
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name' | 'address' | 'tin' | 'status' | 'vendorType'>
  )> }
);

export type ImagesQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type ImagesQuery = (
  { __typename?: 'Query' }
  & { images?: Maybe<Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'url'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'productAvailableTo' | 'productAvailableFrom' | 'basePrice' | 'barcode' | 'packSize' | 'discount' | 'category' | 'status' | 'manufacturer' | 'tags'>
  )> }
);

export type ProductsQueryVariables = Exact<{
  vendorId?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'points' | 'downPoints' | 'voteStatus' | 'createdAt' | 'updatedAt' | 'title' | 'description' | 'descSnippet' | 'productAvailableTo' | 'productAvailableFrom' | 'basePrice' | 'packSize' | 'discount' | 'category' | 'status' | 'manufacturer' | 'tags' | 'vendorId'>
  )> }
);

export type VendorQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type VendorQuery = (
  { __typename?: 'Query' }
  & { vendor?: Maybe<(
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name' | 'address' | 'tin' | 'image' | 'status' | 'vendorType' | 'createdAt' | 'updatedAt'>
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  status
  roles
  firstName
  lastName
  vendorId
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {
  changePassword(
    token: $token
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateProductDocument = gql`
    mutation CreateProduct($options: ProductInput!) {
  createProduct(options: $options) {
    errors {
      field
      message
    }
    product {
      id
      createdAt
      updatedAt
      title
      description
      productAvailableTo
      productAvailableFrom
      basePrice
      barcode
      packSize
      discount
      category
      status
      manufacturer
      tags
    }
    images {
      id
      productId
      url
      updatedAt
      createdAt
    }
  }
}
    `;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Boolean!, $productId: Int!) {
  vote(value: $value, productId: $productId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const CountProductsDocument = gql`
    query CountProducts($vendorId: Int) {
  countProducts(vendorId: $vendorId)
}
    `;

export function useCountProductsQuery(options: Omit<Urql.UseQueryArgs<CountProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CountProductsQuery>({ query: CountProductsDocument, ...options });
};
export const GetProductsDocument = gql`
    query getProducts($limit: Int!, $cursor: String, $vendorId: Int) {
  getProducts(cursor: $cursor, limit: $limit, vendorId: $vendorId) {
    hasMore
    products {
      id
      points
      downPoints
      voteStatus
      createdAt
      updatedAt
      title
      description
      productAvailableTo
      productAvailableFrom
      basePrice
      packSize
      discount
      category
      status
      manufacturer
      tags
      vendorId
      vendor {
        id
        image
        name
      }
      images {
        id
        url
        productId
      }
    }
  }
}
    `;

export function useGetProductsQuery(options: Omit<Urql.UseQueryArgs<GetProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetProductsQuery>({ query: GetProductsDocument, ...options });
};
export const GetPublicVendorDocument = gql`
    query getPublicVendor {
  getPublicVendor {
    id
    name
    address
    tin
    status
    vendorType
  }
}
    `;

export function useGetPublicVendorQuery(options: Omit<Urql.UseQueryArgs<GetPublicVendorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPublicVendorQuery>({ query: GetPublicVendorDocument, ...options });
};
export const ImagesDocument = gql`
    query Images($productId: Int!) {
  images(productId: $productId) {
    id
    url
  }
}
    `;

export function useImagesQuery(options: Omit<Urql.UseQueryArgs<ImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ImagesQuery>({ query: ImagesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    id
    createdAt
    updatedAt
    title
    description
    productAvailableTo
    productAvailableFrom
    basePrice
    barcode
    packSize
    discount
    category
    status
    manufacturer
    tags
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products($vendorId: Int) {
  products(vendorId: $vendorId) {
    id
    points
    downPoints
    voteStatus
    createdAt
    updatedAt
    title
    description
    descSnippet
    productAvailableTo
    productAvailableFrom
    basePrice
    packSize
    discount
    category
    status
    manufacturer
    tags
    vendorId
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const VendorDocument = gql`
    query Vendor($id: Int!) {
  vendor(id: $id) {
    id
    name
    address
    tin
    image
    status
    vendorType
    createdAt
    updatedAt
  }
}
    `;

export function useVendorQuery(options: Omit<Urql.UseQueryArgs<VendorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<VendorQuery>({ query: VendorDocument, ...options });
};