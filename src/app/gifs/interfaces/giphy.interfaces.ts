export interface GifphyItem {
    type: string;
    id: string;
    url: string;
    slug: string;
    bitly_gif_url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    title: string;
    rating: string;
    content_url: string;
    source_tld: string;
    source_post_url: string;
    is_sticker: number;
    import_datetime: string;
    trending_datetime: string;
    images: Images;
    user: User;
    analytics_response_payload: string;
    analytics: Analytics;
    alt_text: string;
  }
  
  export interface Images {
    original: ImageFormat;
    fixed_height: ImageFormat;
    fixed_height_downsampled: ImageFormat;
    fixed_height_small: ImageFormat;
    fixed_width: ImageFormat;
    fixed_width_downsampled: ImageFormat;
    fixed_width_small: ImageFormat;
  }
  
  export interface ImageFormat {
    height: string;
    width: string;
    size: string;
    url: string;
    mp4_size?: string;
    mp4?: string;
    webp_size?: string;
    webp?: string;
    frames?: string;
    hash?: string;
  }
  
  export interface User {
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    description: string;
    instagram_url: string;
    website_url: string;
    is_verified: boolean;
  }
  
  export interface Analytics {
    onload: ActionUrl;
    onclick: ActionUrl;
    onsent: ActionUrl;
  }
  
  export interface ActionUrl {
    url: string;
  }
  
  export interface Meta {
    status: number;
    msg: string;
    response_id: string;
  }
  
  export interface Pagination {
    total_count: number;
    count: number;
    offset: number;
  }
  
  export interface GiphyResponse {
    data: GifphyItem[];
    meta: Meta;
    pagination: Pagination;
  }