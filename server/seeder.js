import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js'; // Product Model Import
import connectDB from './config/db.js';

dotenv.config();
connectDB(); // DB Connect

// Tumhara Provided Data
const products = [
 
  {
    "STYLE": "NLSOG513",
    "STYLE_NAME": "unicorn border check skirt",
    "BRAND": "Lilly and Sid",
    "MRP": 2299.0,
    "GENDER":"Girl",
    "CATEGORY": "Skirts",
    "IMAGE_URL": "/product_img/unicorn_border_check_skirt.png",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOG51303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG51304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG51305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG51306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG51307",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG51308",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBB523",
    "STYLE_NAME": "textured stripe dungarees",
    "BRAND": "Lilly and Sid",
    "MRP": 1899.0,
    "GENDER":"Boy",
    "CATEGORY": "Dungarees",
    "IMAGE_URL": "/product_img/Lilly-and-Sid-Unisex-Kids-Striped-Cotton-Dungaree.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBB52303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52312",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52318",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52324",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBB524",
    "STYLE_NAME": "rib dungarees",
    "BRAND": "Lilly and Sid",
    "MRP": 2299.0,
    "GENDER":"Boy",
    "CATEGORY": "Dungarees",
    "IMAGE_URL": "/product_img/Lilly-and-Sid-Unisex-Kids-Embroidered-Dungarees.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBB52403",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52406",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52412",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52418",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52424",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB518",
    "STYLE_NAME": "check trousers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099.0,
    "GENDER":"Boy",
    "CATEGORY": "Trousers",
    "IMAGE_URL": "/product_img/NLSAB518.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB51803",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51806",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51812",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51818",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51824",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB518THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51804",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51805",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB518SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51807",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51808",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551035",
        "SKU_ID": "109551035",
        "SELLER_SKU": "NLSAB518-03M",
        "AGE": "518-03M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551036",
        "SKU_ID": "109551036",
        "SELLER_SKU": "NLSAB518-06M",
        "AGE": "518-06M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551037",
        "SKU_ID": "109551037",
        "SELLER_SKU": "NLSAB518-12M",
        "AGE": "518-12M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551038",
        "SKU_ID": "109551038",
        "SELLER_SKU": "NLSAB518-18M",
        "AGE": "518-18M",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551039",
        "SKU_ID": "109551039",
        "SELLER_SKU": "NLSAB518-24M",
        "AGE": "518-24M",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551040",
        "SKU_ID": "109551040",
        "SELLER_SKU": "NLSAB518-03Y",
        "AGE": "518-03Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551041",
        "SKU_ID": "109551041",
        "SELLER_SKU": "NLSAB518-04Y",
        "AGE": "518-04Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551042",
        "SKU_ID": "109551042",
        "SELLER_SKU": "NLSAB518-05Y",
        "AGE": "518-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551043",
        "SKU_ID": "109551043",
        "SELLER_SKU": "NLSAB518-06Y",
        "AGE": "518-06Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551044",
        "SKU_ID": "109551044",
        "SELLER_SKU": "NLSAB518-07Y",
        "AGE": "518-07Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT109551045",
        "SKU_ID": "109551045",
        "SELLER_SKU": "NLSAB518-08Y",
        "AGE": "518-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB504",
    "STYLE_NAME": "applique dragon top",
    "BRAND": "Lilly and Sid",
    "MRP": 1399.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB504.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50403",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50404",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50405",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50406",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50407",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50408",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500045",
        "SKU_ID": "109500045",
        "SELLER_SKU": "LSTOP05-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500046",
        "SKU_ID": "109500046",
        "SELLER_SKU": "LSTOP05-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500047",
        "SKU_ID": "109500047",
        "SELLER_SKU": "LSTOP05-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500048",
        "SKU_ID": "109500048",
        "SELLER_SKU": "LSTOP05-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500049",
        "SKU_ID": "109500049",
        "SELLER_SKU": "LSTOP05-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500050",
        "SKU_ID": "109500050",
        "SELLER_SKU": "LSTOP05-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOG502",
    "STYLE_NAME": "wand wish top",
    "BRAND": "Lilly and Sid",
    "MRP": 1399.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOG502.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOG50203",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50204",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50206",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50207",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50208",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764939",
        "SKU_ID": "110764939",
        "SELLER_SKU": "LSTOP15-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764940",
        "SKU_ID": "110764940",
        "SELLER_SKU": "LSTOP15-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764941",
        "SKU_ID": "110764941",
        "SELLER_SKU": "LSTOP15-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764942",
        "SKU_ID": "110764942",
        "SELLER_SKU": "LSTOP15-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764943",
        "SKU_ID": "110764943",
        "SELLER_SKU": "LSTOP15-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110764944",
        "SKU_ID": "110764944",
        "SELLER_SKU": "LSTOP15-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOG503",
    "STYLE_NAME": "unicorn print stripe top",
    "BRAND": "Lilly and Sid",
    "MRP": 1399.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOG503.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOG50303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50307",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOG50308",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500129",
        "SKU_ID": "109500129",
        "SELLER_SKU": "LSTOP07-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500130",
        "SKU_ID": "109500130",
        "SELLER_SKU": "LSTOP07-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500131",
        "SKU_ID": "109500131",
        "SELLER_SKU": "LSTOP07-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500132",
        "SKU_ID": "109500132",
        "SELLER_SKU": "LSTOP07-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500133",
        "SKU_ID": "109500133",
        "SELLER_SKU": "LSTOP07-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500134",
        "SKU_ID": "109500134",
        "SELLER_SKU": "LSTOP07-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB512",
    "STYLE_NAME": "badger applique top",
    "BRAND": "Lilly and Sid",
    "MRP": 1499.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB512.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB51203",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51204",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51206",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51207",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51208",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500077",
        "SKU_ID": "109500077",
        "SELLER_SKU": "LSTOP08-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500078",
        "SKU_ID": "109500078",
        "SELLER_SKU": "LSTOP08-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500079",
        "SKU_ID": "109500079",
        "SELLER_SKU": "LSTOP08-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500080",
        "SKU_ID": "109500080",
        "SELLER_SKU": "LSTOP08-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500081",
        "SKU_ID": "109500081",
        "SELLER_SKU": "LSTOP08-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500082",
        "SKU_ID": "109500082",
        "SELLER_SKU": "LSTOP08-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB507",
    "STYLE_NAME": "badger sweatshirt",
    "BRAND": "Lilly and Sid",
    "MRP": 1799.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB507.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50704",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50705",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50707",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50708",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB516",
    "STYLE_NAME": "badger character joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 1799.0,
    "GENDER":"Boy",
    "CATEGORY": "Joggers",
    "IMAGE_URL": "/product_img/NLSOB516.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB51603",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51604",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51605",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51606",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51607",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51608",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBG521",
    "STYLE_NAME": "embroidered tunic/legging set",
    "BRAND": "Lilly and Sid",
    "MRP": 2199.0,
    "GENDER":"Boy",
    "CATEGORY": "Sets",
    "IMAGE_URL": "/product_img/NLSBG521.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBG52103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG52112",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG52124",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG52106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG52118",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBB527",
    "STYLE_NAME": "textures stripe bottoms playset",
    "BRAND": "Lilly and Sid",
    "MRP": 1999.0,
    "GENDER":"Boy",
    "CATEGORY": "Sets",
    "IMAGE_URL": "/product_img/NLSBB527.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBB52703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52712",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52724",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB52718",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 10,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBG517",
    "STYLE_NAME": "pink cord dungaree",
    "BRAND": "Lilly and Sid",
    "MRP": 2199.0,
    "GENDER":"Boy",
    "CATEGORY": "Dungarees",
    "IMAGE_URL": "/product_img/NLSBG517.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBG51703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG51712",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG51724",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG51706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBG51718",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB500",
    "STYLE_NAME": "stripe monster pocket top",
    "BRAND": "Lilly and Sid",
    "MRP": 1399.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB500.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50003",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50004",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50005",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50006",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50007",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50008",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500089",
        "SKU_ID": "109500089",
        "SELLER_SKU": "LSTOP01-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500090",
        "SKU_ID": "109500090",
        "SELLER_SKU": "LSTOP01-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500091",
        "SKU_ID": "109500091",
        "SELLER_SKU": "LSTOP01-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500092",
        "SKU_ID": "109500092",
        "SELLER_SKU": "LSTOP01-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500093",
        "SKU_ID": "109500093",
        "SELLER_SKU": "LSTOP01-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500094",
        "SKU_ID": "109500094",
        "SELLER_SKU": "LSTOP01-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB519",
    "STYLE_NAME": "navy cord dino trousers",
    "BRAND": "Lilly and Sid",
    "MRP": 1999.0,
    "GENDER":"Boy",
    "CATEGORY": "Trousers",
    "IMAGE_URL": "/product_img/NLSAB519.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB51903",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51906",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51905",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB519SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51907",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51908",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51912",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51918",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51024",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB519THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB51904",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB501",
    "STYLE_NAME": "star joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 1499.0,
    "GENDER":"Boy",
    "CATEGORY": "Joggers",
    "IMAGE_URL": "/product_img/NLSAB501.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB50103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50112",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50118",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50124",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB501THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB501SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB502",
    "STYLE_NAME": "animals sweat",
    "BRAND": "Lilly and Sid",
    "MRP": 1599.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSAB502.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB50203",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50206",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50212",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50218",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50224",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50208",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB502THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50204",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB502SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50207",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB503",
    "STYLE_NAME": "animals joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 1499.0,
    "GENDER":"Boy",
    "CATEGORY": "Joggers",
    "IMAGE_URL": "/product_img/NLSAB503.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB50303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50312",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50318",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50324",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50308",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB503THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB503SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50307",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB504",
    "STYLE_NAME": "leopard sweat",
    "BRAND": "Lilly and Sid",
    "MRP": 1299.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSAB504.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB50403",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50406",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50412",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50418",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50424",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSAB505",
    "STYLE_NAME": "leopard joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 1499.0,
    "GENDER":"Boy",
    "CATEGORY": "Joggers",
    "IMAGE_URL": "/product_img/NLSAB505.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSAB50503",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50506",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50512",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50518",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50524",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB505THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50504",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50505",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB505SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSAB50507",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSBB517",
    "STYLE_NAME": "DINO SPIKE PLAY SET",
    "BRAND": "Lilly and Sid",
    "MRP": 1799.0,
    "GENDER":"Boy",
    "CATEGORY": "Sets",
    "IMAGE_URL": "/product_img/NLSBB517.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSBB51703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-3 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB51706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB51712",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB51718",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "12-18 Monhs",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSBB51724",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "18-24 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB501",
    "STYLE_NAME": "DINO  SLEEVE TOP",
    "BRAND": "Lilly and Sid",
    "MRP": 1299.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB501.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50108",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500064",
        "SKU_ID": "109500064",
        "SELLER_SKU": "LSTOP02-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500065",
        "SKU_ID": "109500065",
        "SELLER_SKU": "LSTOP02-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500066",
        "SKU_ID": "109500066",
        "SELLER_SKU": "LSTOP02-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500067",
        "SKU_ID": "109500067",
        "SELLER_SKU": "LSTOP02-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500068",
        "SKU_ID": "109500068",
        "SELLER_SKU": "LSTOP02-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500069",
        "SKU_ID": "109500069",
        "SELLER_SKU": "LSTOP02-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB511",
    "STYLE_NAME": "LEOPARD APPLIQUE TOP",
    "BRAND": "Lilly and Sid",
    "MRP": 1299.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB511.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB51103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51108",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500106",
        "SKU_ID": "109500106",
        "SELLER_SKU": "LSTOP06-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500107",
        "SKU_ID": "109500107",
        "SELLER_SKU": "LSTOP06-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500108",
        "SKU_ID": "109500108",
        "SELLER_SKU": "LSTOP06-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500109",
        "SKU_ID": "109500109",
        "SELLER_SKU": "LSTOP06-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500112",
        "SKU_ID": "109500112",
        "SELLER_SKU": "LSTOP06-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500113",
        "SKU_ID": "109500113",
        "SELLER_SKU": "LSTOP06-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB502",
    "STYLE_NAME": "LEOPARD SLEEVE TOP",
    "BRAND": "Lilly and Sid",
    "MRP": 1299.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB502.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50203",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50204",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50206",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50207",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50208",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500117",
        "SKU_ID": "109500117",
        "SELLER_SKU": "LSTOP03-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500118",
        "SKU_ID": "109500118",
        "SELLER_SKU": "LSTOP03-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500119",
        "SKU_ID": "109500119",
        "SELLER_SKU": "LSTOP03-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500120",
        "SKU_ID": "109500120",
        "SELLER_SKU": "LSTOP03-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500121",
        "SKU_ID": "109500121",
        "SELLER_SKU": "LSTOP03-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500122",
        "SKU_ID": "109500122",
        "SELLER_SKU": "LSTOP03-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB506",
    "STYLE_NAME": "STAY WILD TOP",
    "BRAND": "Lilly and Sid",
    "MRP": 1049.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB506.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50603",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50604",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50605",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50606",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50607",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50608",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500098",
        "SKU_ID": "109500098",
        "SELLER_SKU": "LSTOP04-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500099",
        "SKU_ID": "109500099",
        "SELLER_SKU": "LSTOP04-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500100",
        "SKU_ID": "109500100",
        "SELLER_SKU": "LSTOP04-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500101",
        "SKU_ID": "109500101",
        "SELLER_SKU": "LSTOP04-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500102",
        "SKU_ID": "109500102",
        "SELLER_SKU": "LSTOP04-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500103",
        "SKU_ID": "109500103",
        "SELLER_SKU": "LSTOP04-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB508",
    "STYLE_NAME": "BEAR POCKET TOP",
    "BRAND": "Lilly and Sid",
    "MRP": 1299.0,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/NLSOB508.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB50803",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50804",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50805",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50806",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50807",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB50808",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500052",
        "SKU_ID": "109500052",
        "SELLER_SKU": "LSTOP09-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500054",
        "SKU_ID": "109500054",
        "SELLER_SKU": "LSTOP09-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500056",
        "SKU_ID": "109500056",
        "SELLER_SKU": "LSTOP09-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500058",
        "SKU_ID": "109500058",
        "SELLER_SKU": "LSTOP09-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500060",
        "SKU_ID": "109500060",
        "SELLER_SKU": "LSTOP09-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS109500061",
        "SKU_ID": "109500061",
        "SELLER_SKU": "LSTOP09-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "NLSOB513",
    "STYLE_NAME": "STAR KNEE JOGGERS",
    "BRAND": "Lilly and Sid",
    "MRP": 1599.0,
    "GENDER":"Boy",
    "CATEGORY": "Joggers",
    "IMAGE_URL": "/product_img/NLSOB513.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "NLSOB51303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51307",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "NLSOB51308",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB112",
    "STYLE_NAME": "3PK HENLEY TOP-NAVY/STRIPE/STRIPE 2-3 YEARS",
    "BRAND": "Lilly and Sid",
    "MRP": 1999,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/LLSAB112.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSAB112THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB112SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11207",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11208",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB113",
    "STYLE_NAME": "3PK TOP-DINO/STRIPE/STRIPE 2-3 YEARS",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/LLSAB113.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSAB113THREE",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB113SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11307",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSAB11308",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826069",
        "SKU_ID": "110826069",
        "SELLER_SKU": "LSTOP13-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826070",
        "SKU_ID": "110826070",
        "SELLER_SKU": "LSTOP13-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826071",
        "SKU_ID": "110826071",
        "SELLER_SKU": "LSTOP13-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826072",
        "SKU_ID": "110826072",
        "SELLER_SKU": "LSTOP13-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826073",
        "SKU_ID": "110826073",
        "SELLER_SKU": "LSTOP13-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826074",
        "SKU_ID": "110826074",
        "SELLER_SKU": "LSTOP13-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "FLSOB107",
    "STYLE_NAME": "STRIPE POCKET T",
    "BRAND": "Lilly and Sid",
    "MRP": 799,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/FLSOB107.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "FLSOB10703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB10704",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB10705",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB10706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB10707",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB10708",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701758",
        "SKU_ID": "108701758",
        "SELLER_SKU": "LSTSHIRT07-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701759",
        "SKU_ID": "108701759",
        "SELLER_SKU": "LSTSHIRT07-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701760",
        "SKU_ID": "108701760",
        "SELLER_SKU": "LSTSHIRT07-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701761",
        "SKU_ID": "108701761",
        "SELLER_SKU": "LSTSHIRT07-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701762",
        "SKU_ID": "108701762",
        "SELLER_SKU": "LSTSHIRT07-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701763",
        "SKU_ID": "108701763",
        "SELLER_SKU": "LSTSHIRT07-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB323",
    "STYLE_NAME": "APPLIQUE T- STINGRAY",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOB323.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOB32303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701752",
        "SKU_ID": "108701752",
        "SELLER_SKU": "LSTSHIRT08-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701753",
        "SKU_ID": "108701753",
        "SELLER_SKU": "LSTSHIRT08-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701754",
        "SKU_ID": "108701754",
        "SELLER_SKU": "LSTSHIRT08-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701755",
        "SKU_ID": "108701755",
        "SELLER_SKU": "LSTSHIRT08-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701756",
        "SKU_ID": "108701756",
        "SELLER_SKU": "LSTSHIRT08-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701757",
        "SKU_ID": "108701757",
        "SELLER_SKU": "LSTSHIRT08-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB324",
    "STYLE_NAME": "APPLIQUE T- DINO BUS",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOB324.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOB32404",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32405",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32406",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32407",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701770",
        "SKU_ID": "108701770",
        "SELLER_SKU": "LSTSHIRT09-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701771",
        "SKU_ID": "108701771",
        "SELLER_SKU": "LSTSHIRT09-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701772",
        "SKU_ID": "108701772",
        "SELLER_SKU": "LSTSHIRT09-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701773",
        "SKU_ID": "108701773",
        "SELLER_SKU": "LSTSHIRT09-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701774",
        "SKU_ID": "108701774",
        "SELLER_SKU": "LSTSHIRT09-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701775",
        "SKU_ID": "108701775",
        "SELLER_SKU": "LSTSHIRT09-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOG307",
    "STYLE_NAME": "APPLIQUE TOP- SEA PALS",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOG307.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOG30703",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOG30705",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOG30706",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOG30707",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOG30708",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701764",
        "SKU_ID": "108701764",
        "SELLER_SKU": "LSTSHIRT10-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701765",
        "SKU_ID": "108701765",
        "SELLER_SKU": "LSTSHIRT10-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701766",
        "SKU_ID": "108701766",
        "SELLER_SKU": "LSTSHIRT10-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701767",
        "SKU_ID": "108701767",
        "SELLER_SKU": "LSTSHIRT10-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701768",
        "SKU_ID": "108701768",
        "SELLER_SKU": "LSTSHIRT10-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108701769",
        "SKU_ID": "108701769",
        "SELLER_SKU": "LSTSHIRT10-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "FLSOB121",
    "STYLE_NAME": "APPLIQUE T - SUPER STRONG PANDA",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/FLSOB121.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "FLSOB12103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB12104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB12105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB12106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB12107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB12108",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606314",
        "SKU_ID": "108606314",
        "SELLER_SKU": "LSTSHIRT01-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606315",
        "SKU_ID": "108606315",
        "SELLER_SKU": "LSTSHIRT01-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606316",
        "SKU_ID": "108606316",
        "SELLER_SKU": "LSTSHIRT01-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606317",
        "SKU_ID": "108606317",
        "SELLER_SKU": "LSTSHIRT01-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606318",
        "SKU_ID": "108606318",
        "SELLER_SKU": "LSTSHIRT01-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606319",
        "SKU_ID": "108606319",
        "SELLER_SKU": "LSTSHIRT01-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "FLSOB111",
    "STYLE_NAME": "CUT AND SEW SEA SCENE T",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/FLSOB111.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "FLSOB11103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11108",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606378",
        "SKU_ID": "108606378",
        "SELLER_SKU": "LSTSHIRT02-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606379",
        "SKU_ID": "108606379",
        "SELLER_SKU": "LSTSHIRT02-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606380",
        "SKU_ID": "108606380",
        "SELLER_SKU": "LSTSHIRT02-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606381",
        "SKU_ID": "108606381",
        "SELLER_SKU": "LSTSHIRT02-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606382",
        "SKU_ID": "108606382",
        "SELLER_SKU": "LSTSHIRT02-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606383",
        "SKU_ID": "108606383",
        "SELLER_SKU": "LSTSHIRT02-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB319",
    "STYLE_NAME": "SHARK CHARACTER T",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOB319.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOB31904",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB31905",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB31906",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB31907",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB31908",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606302",
        "SKU_ID": "108606302",
        "SELLER_SKU": "LSTSHIRT03-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606303",
        "SKU_ID": "108606303",
        "SELLER_SKU": "LSTSHIRT03-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606304",
        "SKU_ID": "108606304",
        "SELLER_SKU": "LSTSHIRT03-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606305",
        "SKU_ID": "108606305",
        "SELLER_SKU": "LSTSHIRT03-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606306",
        "SKU_ID": "108606306",
        "SELLER_SKU": "LSTSHIRT03-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606307",
        "SKU_ID": "108606307",
        "SELLER_SKU": "LSTSHIRT03-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB320",
    "STYLE_NAME": "TIGER CHARACTER T",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOB320.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOB32003",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32004",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32005",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32006",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32007",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606355",
        "SKU_ID": "108606355",
        "SELLER_SKU": "LSTSHIRT04-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606356",
        "SKU_ID": "108606356",
        "SELLER_SKU": "LSTSHIRT04-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606357",
        "SKU_ID": "108606357",
        "SELLER_SKU": "LSTSHIRT04-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606358",
        "SKU_ID": "108606358",
        "SELLER_SKU": "LSTSHIRT04-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606359",
        "SKU_ID": "108606359",
        "SELLER_SKU": "LSTSHIRT04-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606360",
        "SKU_ID": "108606360",
        "SELLER_SKU": "LSTSHIRT04-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB321",
    "STYLE_NAME": "APPLIQUE T-GOOD CATCH",
    "BRAND": "Lilly and Sid",
    "MRP": 1049,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/HLSOB321.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "HLSOB32103",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32104",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32105",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32106",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32107",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-7 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "HLSOB32108",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606408",
        "SKU_ID": "108606408",
        "SELLER_SKU": "LSTSHIRT05-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606411",
        "SKU_ID": "108606411",
        "SELLER_SKU": "LSTSHIRT05-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606413",
        "SKU_ID": "108606413",
        "SELLER_SKU": "LSTSHIRT05-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606414",
        "SKU_ID": "108606414",
        "SELLER_SKU": "LSTSHIRT05-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606415",
        "SKU_ID": "108606415",
        "SELLER_SKU": "LSTSHIRT05-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606416",
        "SKU_ID": "108606416",
        "SELLER_SKU": "LSTSHIRT05-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "FLSOB110",
    "STYLE_NAME": "FUN IN BUN T",
    "BRAND": "Lilly and Sid",
    "MRP": 1049,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/FLSOB110.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "FLSOB11003",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11004",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11005",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11006",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "FLSOB11008",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "7-8 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606326",
        "SKU_ID": "108606326",
        "SELLER_SKU": "LSTSHIRT06-2-3Y",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606327",
        "SKU_ID": "108606327",
        "SELLER_SKU": "LSTSHIRT06-3-4Y",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606328",
        "SKU_ID": "108606328",
        "SELLER_SKU": "LSTSHIRT06-4-5Y",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606329",
        "SKU_ID": "108606329",
        "SELLER_SKU": "LSTSHIRT06-5-6Y",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606330",
        "SKU_ID": "108606330",
        "SELLER_SKU": "LSTSHIRT06-6-7Y",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITSHT108606331",
        "SKU_ID": "108606331",
        "SELLER_SKU": "LSTSHIRT06-7-8Y",
        "AGE": "7-8Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "KTD373",
    "STYLE_NAME": "Living Life Embroidered T Charcoal",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "tops",
    "IMAGE_URL": "/product_img/KTD373.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "KTD37306",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "KTD37312",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "KTD37302",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "1-2 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "KTD37303",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "KTD37304",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "KTD37305",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "MTD482",
    "STYLE_NAME": "CHARACTER T",
    "BRAND": "Lilly and Sid",
    "MRP": 999,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/MTD482.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "MTD48206",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48212",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48202",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "1-2 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48203",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48204",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48205",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD482SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "MTD484",
    "STYLE_NAME": "SEE THE SEA T",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/MTD484.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "MTD48406",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48412",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48402",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "1-2 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48403",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48404",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48405",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD484SIX",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "5-6 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "MTD485",
    "STYLE_NAME": "OCTOPUS T",
    "BRAND": "Lilly and Sid",
    "MRP": 899,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/MTD485.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "MTD48506",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "0-6 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48512",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48502",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "1-2 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48503",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48504",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48505",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "MTD486",
    "STYLE_NAME": "PANDA CHARACTER T ",
    "BRAND": "Lilly and Sid",
    "MRP": 999,
    "GENDER":"Boy",
    "CATEGORY": "Tops",
    "IMAGE_URL": "/product_img/MTD486.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "MTD48612",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "6-12 Months",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48602",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "1-2 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48603",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "2-3 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48604",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "3-4 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "MTD48605",
        "SKU_ID": "",
        "SELLER_SKU": "",
        "AGE": "4-5 Years",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSOB308",
    "STYLE_NAME": "Lilly and Sid Kids Printed Top",
    "BRAND": "Lilly and Sid",
    "MRP": 799,
    "GENDER":"Boy",
    "CATEGORY": "Top",
    "IMAGE_URL": "/product_img/LLSOB308.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITOPS110826062",
        "SKU_ID": "110826062",
        "SELLER_SKU": "LSTOP10-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826063",
        "SKU_ID": "110826063",
        "SELLER_SKU": "LSTOP10-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826064",
        "SKU_ID": "110826064",
        "SELLER_SKU": "LSTOP10-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826065",
        "SKU_ID": "110826065",
        "SELLER_SKU": "LSTOP10-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826066",
        "SKU_ID": "110826066",
        "SELLER_SKU": "LSTOP10-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826067",
        "SKU_ID": "110826067",
        "SELLER_SKU": "LSTOP10-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSOB309",
    "STYLE_NAME": "Lilly and Sid Kids Printed Organic Cotton T-shirt",
    "BRAND": "Lilly and Sid",
    "MRP": 799,
    "GENDER":"Boy",
    "CATEGORY": "Top",
    "IMAGE_URL": "/product_img/LLSOB309.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITOPS110826055",
        "SKU_ID": "110826055",
        "SELLER_SKU": "LSTOP11-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826056",
        "SKU_ID": "110826056",
        "SELLER_SKU": "LSTOP11-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826057",
        "SKU_ID": "110826057",
        "SELLER_SKU": "LSTOP11-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826058",
        "SKU_ID": "110826058",
        "SELLER_SKU": "LSTOP11-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826059",
        "SKU_ID": "110826059",
        "SELLER_SKU": "LSTOP11-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826060",
        "SKU_ID": "110826060",
        "SELLER_SKU": "LSTOP11-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB512",
    "STYLE_NAME": "Lilly and Sid Kids Unisex Pack of 3 Striped Organic Cotton Tshirts",
    "BRAND": "Lilly and Sid",
    "MRP": 1999,
    "GENDER":"Boy",
    "CATEGORY": "Top",
    "IMAGE_URL": "/product_img/LLSAB512.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITOPS110826077",
        "SKU_ID": "110826077",
        "SELLER_SKU": "LSTOP12-2-3YR",
        "AGE": "2-3Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826078",
        "SKU_ID": "110826078",
        "SELLER_SKU": "LSTOP12-3-4YR",
        "AGE": "3-4Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826079",
        "SKU_ID": "110826079",
        "SELLER_SKU": "LSTOP12-4-5YR",
        "AGE": "4-5Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826080",
        "SKU_ID": "110826080",
        "SELLER_SKU": "LSTOP12-5-6YR",
        "AGE": "5-6Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826081",
        "SKU_ID": "110826081",
        "SELLER_SKU": "LSTOP12-6-7YR",
        "AGE": "6-7Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITOPS110826082",
        "SKU_ID": "110826082",
        "SELLER_SKU": "LSTOP12-7-8YR",
        "AGE": "7-8Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB103",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Track Pants",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSAB103.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110765312",
        "SKU_ID": "110765312",
        "SELLER_SKU": "LLSAB103-03M",
        "AGE": "103-03M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765313",
        "SKU_ID": "110765313",
        "SELLER_SKU": "LLSAB103-06M",
        "AGE": "103-06M",
        "STOCK_QTY": 5,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765314",
        "SKU_ID": "110765314",
        "SELLER_SKU": "LLSAB103-12M",
        "AGE": "103-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765315",
        "SKU_ID": "110765315",
        "SELLER_SKU": "LLSAB103-18M",
        "AGE": "103-18M",
        "STOCK_QTY": 5,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765316",
        "SKU_ID": "110765316",
        "SELLER_SKU": "LLSAB103-24M",
        "AGE": "103-24M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765317",
        "SKU_ID": "110765317",
        "SELLER_SKU": "LLSAB103-03Y",
        "AGE": "103-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765318",
        "SKU_ID": "110765318",
        "SELLER_SKU": "LLSAB103-04Y",
        "AGE": "103-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765319",
        "SKU_ID": "110765319",
        "SELLER_SKU": "LLSAB103-05Y",
        "AGE": "103-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765320",
        "SKU_ID": "110765320",
        "SELLER_SKU": "LLSAB103-06Y",
        "AGE": "103-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765321",
        "SKU_ID": "110765321",
        "SELLER_SKU": "LLSAB103-07Y",
        "AGE": "103-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765322",
        "SKU_ID": "110765322",
        "SELLER_SKU": "LLSAB103-08Y",
        "AGE": "103-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB104",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Track Pants",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSAB104.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110765323",
        "SKU_ID": "110765323",
        "SELLER_SKU": "LLSAB104-03M",
        "AGE": "104-03M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765324",
        "SKU_ID": "110765324",
        "SELLER_SKU": "LLSAB104-06M",
        "AGE": "104-06M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765325",
        "SKU_ID": "110765325",
        "SELLER_SKU": "LLSAB104-12M",
        "AGE": "104-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765326",
        "SKU_ID": "110765326",
        "SELLER_SKU": "LLSAB104-18M",
        "AGE": "104-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765327",
        "SKU_ID": "110765327",
        "SELLER_SKU": "LLSAB104-24M",
        "AGE": "104-24M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765328",
        "SKU_ID": "110765328",
        "SELLER_SKU": "LLSAB104-03Y",
        "AGE": "104-03Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765329",
        "SKU_ID": "110765329",
        "SELLER_SKU": "LLSAB104-04Y",
        "AGE": "104-04Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765330",
        "SKU_ID": "110765330",
        "SELLER_SKU": "LLSAB104-05Y",
        "AGE": "104-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765331",
        "SKU_ID": "110765331",
        "SELLER_SKU": "LLSAB104-06Y",
        "AGE": "104-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765332",
        "SKU_ID": "110765332",
        "SELLER_SKU": "LLSAB104-07Y",
        "AGE": "104-07Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765333",
        "SKU_ID": "110765333",
        "SELLER_SKU": "LLSAB104-08Y",
        "AGE": "104-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "JLSOB800",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Track Pants",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/JLSOB800.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110765334",
        "SKU_ID": "110765334",
        "SELLER_SKU": "JLSOB800-03M",
        "AGE": "800-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765335",
        "SKU_ID": "110765335",
        "SELLER_SKU": "JLSOB800-06M",
        "AGE": "800-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765336",
        "SKU_ID": "110765336",
        "SELLER_SKU": "JLSOB800-12M",
        "AGE": "800-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765337",
        "SKU_ID": "110765337",
        "SELLER_SKU": "JLSOB800-18M",
        "AGE": "800-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765338",
        "SKU_ID": "110765338",
        "SELLER_SKU": "JLSOB800-24M",
        "AGE": "800-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765339",
        "SKU_ID": "110765339",
        "SELLER_SKU": "JLSOB800-03Y",
        "AGE": "800-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765340",
        "SKU_ID": "110765340",
        "SELLER_SKU": "JLSOB800-04Y",
        "AGE": "800-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765341",
        "SKU_ID": "110765341",
        "SELLER_SKU": "JLSOB800-05Y",
        "AGE": "800-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765342",
        "SKU_ID": "110765342",
        "SELLER_SKU": "JLSOB800-06Y",
        "AGE": "800-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765343",
        "SKU_ID": "110765343",
        "SELLER_SKU": "JLSOB800-07Y",
        "AGE": "800-07Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765344",
        "SKU_ID": "110765344",
        "SELLER_SKU": "JLSOB800-08Y",
        "AGE": "800-08Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "JLSOB817",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Track Pants",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/JLSOB817.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110765345",
        "SKU_ID": "110765345",
        "SELLER_SKU": "JLSOB817-03M",
        "AGE": "817-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765346",
        "SKU_ID": "110765346",
        "SELLER_SKU": "JLSOB817-06M",
        "AGE": "817-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765347",
        "SKU_ID": "110765347",
        "SELLER_SKU": "JLSOB817-12M",
        "AGE": "817-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765348",
        "SKU_ID": "110765348",
        "SELLER_SKU": "JLSOB817-18M",
        "AGE": "817-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765349",
        "SKU_ID": "110765349",
        "SELLER_SKU": "JLSOB817-24M",
        "AGE": "817-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765350",
        "SKU_ID": "110765350",
        "SELLER_SKU": "JLSOB817-03Y",
        "AGE": "817-03Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765351",
        "SKU_ID": "110765351",
        "SELLER_SKU": "JLSOB817-04Y",
        "AGE": "817-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765352",
        "SKU_ID": "110765352",
        "SELLER_SKU": "JLSOB817-05Y",
        "AGE": "817-05Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765353",
        "SKU_ID": "110765353",
        "SELLER_SKU": "JLSOB817-06Y",
        "AGE": "817-06Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765354",
        "SKU_ID": "110765354",
        "SELLER_SKU": "JLSOB817-07Y",
        "AGE": "817-07Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110765355",
        "SKU_ID": "110765355",
        "SELLER_SKU": "JLSOB817-08Y",
        "AGE": "817-08Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB106",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/Lilly-and-Sid-Boys-Cotton-JoggersLLSAB106.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814718",
        "SKU_ID": "110814718",
        "SELLER_SKU": "LLSAB106-03M",
        "AGE": "106-03M",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814721",
        "SKU_ID": "110814721",
        "SELLER_SKU": "LLSAB106-06M",
        "AGE": "106-06M",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814723",
        "SKU_ID": "110814723",
        "SELLER_SKU": "LLSAB106-12M",
        "AGE": "106-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814725",
        "SKU_ID": "110814725",
        "SELLER_SKU": "LLSAB106-18M",
        "AGE": "106-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814726",
        "SKU_ID": "110814726",
        "SELLER_SKU": "LLSAB106-24M",
        "AGE": "106-24M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814727",
        "SKU_ID": "110814727",
        "SELLER_SKU": "LLSAB106-03Y",
        "AGE": "106-03Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814728",
        "SKU_ID": "110814728",
        "SELLER_SKU": "LLSAB106-04Y",
        "AGE": "106-04Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814729",
        "SKU_ID": "110814729",
        "SELLER_SKU": "LLSAB106-05Y",
        "AGE": "106-05Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814730",
        "SKU_ID": "110814730",
        "SELLER_SKU": "LLSAB106-06Y",
        "AGE": "106-06Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814731",
        "SKU_ID": "110814731",
        "SELLER_SKU": "LLSAB106-07Y",
        "AGE": "106-07Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814732",
        "SKU_ID": "110814732",
        "SELLER_SKU": "LLSAB106-08Y",
        "AGE": "106-08Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSOB501",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSOB501.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814734",
        "SKU_ID": "110814734",
        "SELLER_SKU": "LLSOB501-03M",
        "AGE": "501-03M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814735",
        "SKU_ID": "110814735",
        "SELLER_SKU": "LLSOB501-06M",
        "AGE": "501-06M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814736",
        "SKU_ID": "110814736",
        "SELLER_SKU": "LLSOB501-12M",
        "AGE": "501-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814737",
        "SKU_ID": "110814737",
        "SELLER_SKU": "LLSOB501-18M",
        "AGE": "501-18M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814738",
        "SKU_ID": "110814738",
        "SELLER_SKU": "LLSOB501-24M",
        "AGE": "501-24M",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814739",
        "SKU_ID": "110814739",
        "SELLER_SKU": "LLSOB501-03Y",
        "AGE": "501-03Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814740",
        "SKU_ID": "110814740",
        "SELLER_SKU": "LLSOB501-04Y",
        "AGE": "501-04Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814741",
        "SKU_ID": "110814741",
        "SELLER_SKU": "LLSOB501-05Y",
        "AGE": "501-05Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814742",
        "SKU_ID": "110814742",
        "SELLER_SKU": "LLSOB501-06Y",
        "AGE": "501-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814743",
        "SKU_ID": "110814743",
        "SELLER_SKU": "LLSOB501-07Y",
        "AGE": "501-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814744",
        "SKU_ID": "110814744",
        "SELLER_SKU": "LLSOB501-08Y",
        "AGE": "501-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LSAB519",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSAB519.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814745",
        "SKU_ID": "110814745",
        "SELLER_SKU": "LSAB519-03M",
        "AGE": "519-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814746",
        "SKU_ID": "110814746",
        "SELLER_SKU": "LSAB519-06M",
        "AGE": "519-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814747",
        "SKU_ID": "110814747",
        "SELLER_SKU": "LSAB519-12M",
        "AGE": "519-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814748",
        "SKU_ID": "110814748",
        "SELLER_SKU": "LSAB519-18M",
        "AGE": "519-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814749",
        "SKU_ID": "110814749",
        "SELLER_SKU": "LSAB519-24M",
        "AGE": "519-24M",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814750",
        "SKU_ID": "110814750",
        "SELLER_SKU": "LSAB519-03Y",
        "AGE": "519-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814751",
        "SKU_ID": "110814751",
        "SELLER_SKU": "LSAB519-04Y",
        "AGE": "519-04Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814752",
        "SKU_ID": "110814752",
        "SELLER_SKU": "LSAB519-05Y",
        "AGE": "519-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814753",
        "SKU_ID": "110814753",
        "SELLER_SKU": "LSAB519-06Y",
        "AGE": "519-06Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814754",
        "SKU_ID": "110814754",
        "SELLER_SKU": "LSAB519-07Y",
        "AGE": "519-07Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814755",
        "SKU_ID": "110814755",
        "SELLER_SKU": "LSAB519-08Y",
        "AGE": "519-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSAB107",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Girl",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSAB107.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814771",
        "SKU_ID": "110814771",
        "SELLER_SKU": "LLSAB107-03M",
        "AGE": "107-03M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814772",
        "SKU_ID": "110814772",
        "SELLER_SKU": "LLSAB107-06M",
        "AGE": "107-06M",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814773",
        "SKU_ID": "110814773",
        "SELLER_SKU": "LLSAB107-12M",
        "AGE": "107-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814774",
        "SKU_ID": "110814774",
        "SELLER_SKU": "LLSAB107-18M",
        "AGE": "107-18M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814775",
        "SKU_ID": "110814775",
        "SELLER_SKU": "LLSAB107-24M",
        "AGE": "107-24M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814776",
        "SKU_ID": "110814776",
        "SELLER_SKU": "LLSAB107-03Y",
        "AGE": "107-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814777",
        "SKU_ID": "110814777",
        "SELLER_SKU": "LLSAB107-04Y",
        "AGE": "107-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814778",
        "SKU_ID": "110814778",
        "SELLER_SKU": "LLSAB107-05Y",
        "AGE": "107-05Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814779",
        "SKU_ID": "110814779",
        "SELLER_SKU": "LLSAB107-06Y",
        "AGE": "107-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814780",
        "SKU_ID": "110814780",
        "SELLER_SKU": "LLSAB107-07Y",
        "AGE": "107-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814781",
        "SKU_ID": "110814781",
        "SELLER_SKU": "LLSAB107-08Y",
        "AGE": "107-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LSAB505",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSAB505.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814783",
        "SKU_ID": "110814783",
        "SELLER_SKU": "LSAB505-03M",
        "AGE": "505-03M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814784",
        "SKU_ID": "110814784",
        "SELLER_SKU": "LSAB505-06M",
        "AGE": "505-06M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814785",
        "SKU_ID": "110814785",
        "SELLER_SKU": "LSAB505-12M",
        "AGE": "505-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814786",
        "SKU_ID": "110814786",
        "SELLER_SKU": "LSAB505-18M",
        "AGE": "505-18M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814787",
        "SKU_ID": "110814787",
        "SELLER_SKU": "LSAB505-24M",
        "AGE": "505-24M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814788",
        "SKU_ID": "110814788",
        "SELLER_SKU": "LSAB505-03Y",
        "AGE": "505-03Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814789",
        "SKU_ID": "110814789",
        "SELLER_SKU": "LSAB505-04Y",
        "AGE": "505-04Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814790",
        "SKU_ID": "110814790",
        "SELLER_SKU": "LSAB505-05Y",
        "AGE": "505-05Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814791",
        "SKU_ID": "110814791",
        "SELLER_SKU": "LSAB505-06Y",
        "AGE": "505-06Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814792",
        "SKU_ID": "110814792",
        "SELLER_SKU": "LSAB505-07Y",
        "AGE": "505-07Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814793",
        "SKU_ID": "110814793",
        "SELLER_SKU": "LSAB505-08Y",
        "AGE": "505-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "HLSOB318",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/HLSOB318.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814815",
        "SKU_ID": "110814815",
        "SELLER_SKU": "HLSOB318-03M",
        "AGE": "318-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814816",
        "SKU_ID": "110814816",
        "SELLER_SKU": "HLSOB318-06M",
        "AGE": "318-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814817",
        "SKU_ID": "110814817",
        "SELLER_SKU": "HLSOB318-12M",
        "AGE": "318-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814818",
        "SKU_ID": "110814818",
        "SELLER_SKU": "HLSOB318-18M",
        "AGE": "318-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814819",
        "SKU_ID": "110814819",
        "SELLER_SKU": "HLSOB318-24M",
        "AGE": "318-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814820",
        "SKU_ID": "110814820",
        "SELLER_SKU": "HLSOB318-03Y",
        "AGE": "318-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814821",
        "SKU_ID": "110814821",
        "SELLER_SKU": "HLSOB318-04Y",
        "AGE": "318-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814822",
        "SKU_ID": "110814822",
        "SELLER_SKU": "HLSOB318-05Y",
        "AGE": "318-05Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814823",
        "SKU_ID": "110814823",
        "SELLER_SKU": "HLSOB318-06Y",
        "AGE": "318-06Y",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814824",
        "SKU_ID": "110814824",
        "SELLER_SKU": "HLSOB318-07Y",
        "AGE": "318-07Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814825",
        "SKU_ID": "110814825",
        "SELLER_SKU": "HLSOB318-08Y",
        "AGE": "318-08Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LSOB513",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSOB513.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814826",
        "SKU_ID": "110814826",
        "SELLER_SKU": "LSOB513-03M",
        "AGE": "513-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814827",
        "SKU_ID": "110814827",
        "SELLER_SKU": "LSOB513-06M",
        "AGE": "513-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814828",
        "SKU_ID": "110814828",
        "SELLER_SKU": "LSOB513-12M",
        "AGE": "513-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814829",
        "SKU_ID": "110814829",
        "SELLER_SKU": "LSOB513-18M",
        "AGE": "513-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814830",
        "SKU_ID": "110814830",
        "SELLER_SKU": "LSOB513-24M",
        "AGE": "513-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814831",
        "SKU_ID": "110814831",
        "SELLER_SKU": "LSOB513-03Y",
        "AGE": "513-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814832",
        "SKU_ID": "110814832",
        "SELLER_SKU": "LSOB513-04Y",
        "AGE": "513-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814833",
        "SKU_ID": "110814833",
        "SELLER_SKU": "LSOB513-05Y",
        "AGE": "513-05Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814834",
        "SKU_ID": "110814834",
        "SELLER_SKU": "LSOB513-06Y",
        "AGE": "513-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814835",
        "SKU_ID": "110814835",
        "SELLER_SKU": "LSOB513-07Y",
        "AGE": "513-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814836",
        "SKU_ID": "110814836",
        "SELLER_SKU": "LSOB513-08Y",
        "AGE": "513-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LLSOB302",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSOB302.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814854",
        "SKU_ID": "110814854",
        "SELLER_SKU": "LLSOB302-03M",
        "AGE": "302-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814857",
        "SKU_ID": "110814857",
        "SELLER_SKU": "LLSOB302-06M",
        "AGE": "302-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814859",
        "SKU_ID": "110814859",
        "SELLER_SKU": "LLSOB302-12M",
        "AGE": "302-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814861",
        "SKU_ID": "110814861",
        "SELLER_SKU": "LLSOB302-18M",
        "AGE": "302-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814862",
        "SKU_ID": "110814862",
        "SELLER_SKU": "LLSOB302-24M",
        "AGE": "302-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814863",
        "SKU_ID": "110814863",
        "SELLER_SKU": "LLSOB302-03Y",
        "AGE": "302-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814864",
        "SKU_ID": "110814864",
        "SELLER_SKU": "LLSOB302-04Y",
        "AGE": "302-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814865",
        "SKU_ID": "110814865",
        "SELLER_SKU": "LLSOB302-05Y",
        "AGE": "302-05Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814866",
        "SKU_ID": "110814866",
        "SELLER_SKU": "LLSOB302-06Y",
        "AGE": "302-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814867",
        "SKU_ID": "110814867",
        "SELLER_SKU": "LLSOB302-07Y",
        "AGE": "302-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814868",
        "SKU_ID": "110814868",
        "SELLER_SKU": "LLSOB302-08Y",
        "AGE": "302-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LSOB516",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSOB516.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814915",
        "SKU_ID": "110814915",
        "SELLER_SKU": "LSOB516-03M",
        "AGE": "516-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814916",
        "SKU_ID": "110814916",
        "SELLER_SKU": "LSOB516-06M",
        "AGE": "516-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814917",
        "SKU_ID": "110814917",
        "SELLER_SKU": "LSOB516-12M",
        "AGE": "516-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814918",
        "SKU_ID": "110814918",
        "SELLER_SKU": "LSOB516-18M",
        "AGE": "516-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814919",
        "SKU_ID": "110814919",
        "SELLER_SKU": "LSOB516-24M",
        "AGE": "516-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814920",
        "SKU_ID": "110814920",
        "SELLER_SKU": "LSOB516-03Y",
        "AGE": "516-03Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814921",
        "SKU_ID": "110814921",
        "SELLER_SKU": "LSOB516-04Y",
        "AGE": "516-04Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814922",
        "SKU_ID": "110814922",
        "SELLER_SKU": "LSOB516-05Y",
        "AGE": "516-05Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814923",
        "SKU_ID": "110814923",
        "SELLER_SKU": "LSOB516-06Y",
        "AGE": "516-06Y",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814924",
        "SKU_ID": "110814924",
        "SELLER_SKU": "LSOB516-07Y",
        "AGE": "516-07Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814925",
        "SKU_ID": "110814925",
        "SELLER_SKU": "LSOB516-08Y",
        "AGE": "516-08Y",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LSAB503",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSAB503.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814940",
        "SKU_ID": "110814940",
        "SELLER_SKU": "LSAB503-03M",
        "AGE": "503-03M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814941",
        "SKU_ID": "110814941",
        "SELLER_SKU": "LSAB503-06M",
        "AGE": "503-06M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814942",
        "SKU_ID": "110814942",
        "SELLER_SKU": "LSAB503-12M",
        "AGE": "503-12M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814943",
        "SKU_ID": "110814943",
        "SELLER_SKU": "LSAB503-18M",
        "AGE": "503-18M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814944",
        "SKU_ID": "110814944",
        "SELLER_SKU": "LSAB503-24M",
        "AGE": "503-24M",
        "STOCK_QTY": 4,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814945",
        "SKU_ID": "110814945",
        "SELLER_SKU": "LSAB503-03Y",
        "AGE": "503-03Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814946",
        "SKU_ID": "110814946",
        "SELLER_SKU": "LSAB503-04Y",
        "AGE": "503-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814947",
        "SKU_ID": "110814947",
        "SELLER_SKU": "LSAB503-05Y",
        "AGE": "503-05Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814948",
        "SKU_ID": "110814948",
        "SELLER_SKU": "LSAB503-06Y",
        "AGE": "503-06Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814950",
        "SKU_ID": "110814950",
        "SELLER_SKU": "LSAB503-07Y",
        "AGE": "503-07Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814951",
        "SKU_ID": "110814951",
        "SELLER_SKU": "LSAB503-08Y",
        "AGE": "503-08Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "LLSOB301",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Joggers",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LLSOB301.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110814968",
        "SKU_ID": "110814968",
        "SELLER_SKU": "LLSOB301-03M",
        "AGE": "301-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814969",
        "SKU_ID": "110814969",
        "SELLER_SKU": "LLSOB301-06M",
        "AGE": "301-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814970",
        "SKU_ID": "110814970",
        "SELLER_SKU": "LLSOB301-12M",
        "AGE": "301-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814971",
        "SKU_ID": "110814971",
        "SELLER_SKU": "LLSOB301-18M",
        "AGE": "301-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814972",
        "SKU_ID": "110814972",
        "SELLER_SKU": "LLSOB301-24M",
        "AGE": "301-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814973",
        "SKU_ID": "110814973",
        "SELLER_SKU": "LLSOB301-03Y",
        "AGE": "301-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814974",
        "SKU_ID": "110814974",
        "SELLER_SKU": "LLSOB301-04Y",
        "AGE": "301-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814975",
        "SKU_ID": "110814975",
        "SELLER_SKU": "LLSOB301-05Y",
        "AGE": "301-05Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814976",
        "SKU_ID": "110814976",
        "SELLER_SKU": "LLSOB301-06Y",
        "AGE": "301-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814977",
        "SKU_ID": "110814977",
        "SELLER_SKU": "LLSOB301-07Y",
        "AGE": "301-07Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110814978",
        "SKU_ID": "110814978",
        "SELLER_SKU": "LLSOB301-08Y",
        "AGE": "301-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "LSOB514",
    "STYLE_NAME": "Lilly and Sid Boys Cotton Track Pants",
    "BRAND": "Lilly and Sid",
    "MRP": 2099,
    "GENDER":"Boy",
    "CATEGORY": "Trouser",
    "IMAGE_URL": "/product_img/LSOB514.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSITRPT110816695",
        "SKU_ID": "110816695",
        "SELLER_SKU": "LSOB514-03M",
        "AGE": "514-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816696",
        "SKU_ID": "110816696",
        "SELLER_SKU": "LSOB514-06M",
        "AGE": "514-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816697",
        "SKU_ID": "110816697",
        "SELLER_SKU": "LSOB514-12M",
        "AGE": "514-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816698",
        "SKU_ID": "110816698",
        "SELLER_SKU": "LSOB514-18M",
        "AGE": "514-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816699",
        "SKU_ID": "110816699",
        "SELLER_SKU": "LSOB514-24M",
        "AGE": "514-24M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816700",
        "SKU_ID": "110816700",
        "SELLER_SKU": "LSOB514-03Y",
        "AGE": "514-03Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816701",
        "SKU_ID": "110816701",
        "SELLER_SKU": "LSOB514-04Y",
        "AGE": "514-04Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816702",
        "SKU_ID": "110816702",
        "SELLER_SKU": "LSOB514-05Y",
        "AGE": "514-05Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816703",
        "SKU_ID": "110816703",
        "SELLER_SKU": "LSOB514-06Y",
        "AGE": "514-06Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816704",
        "SKU_ID": "110816704",
        "SELLER_SKU": "LSOB514-07Y",
        "AGE": "514-07Y",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSITRPT110816705",
        "SKU_ID": "110816705",
        "SELLER_SKU": "LSOB514-08Y",
        "AGE": "514-08Y",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      }
    ]
  },
  {
    "STYLE": "34405864",
    "STYLE_NAME": "Lilly and Sid Unisex Kids Embroidered Dungarees",
    "BRAND": "Lilly and sid",
    "MRP": 2299,
    "GENDER":"Boy",
    "CATEGORY": "Dungaree",
    "IMAGE_URL": "/product_img/Lilly-and-Sid-Unisex-Kids-Embroidered-Dungarees.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSIDNGR110844092",
        "SKU_ID": "110844092",
        "SELLER_SKU": "NLSBB524-03M",
        "AGE": "524-03M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844093",
        "SKU_ID": "110844093",
        "SELLER_SKU": "NLSBB524-06M",
        "AGE": "524-06M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844095",
        "SKU_ID": "110844095",
        "SELLER_SKU": "NLSBB524-12M",
        "AGE": "524-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844096",
        "SKU_ID": "110844096",
        "SELLER_SKU": "NLSBB524-18M",
        "AGE": "524-18M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844097",
        "SKU_ID": "110844097",
        "SELLER_SKU": "NLSBB524-24M",
        "AGE": "524-24M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "34405871",
    "STYLE_NAME": "Lilly and Sid Girls Cotton Dungarees",
    "BRAND": "Lilly and sid",
    "MRP": 2199,
    "GENDER":"Boy",
    "CATEGORY": "Dungaree",
    "IMAGE_URL": "/product_img/34405871.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSIDNGR110844103",
        "SKU_ID": "110844103",
        "SELLER_SKU": "NLSBG517-03M",
        "AGE": "517-03M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844104",
        "SKU_ID": "110844104",
        "SELLER_SKU": "NLSBG517-06M",
        "AGE": "517-06M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844105",
        "SKU_ID": "110844105",
        "SELLER_SKU": "NLSBG517-12M",
        "AGE": "517-12M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844106",
        "SKU_ID": "110844106",
        "SELLER_SKU": "NLSBG517-18M",
        "AGE": "517-18M",
        "STOCK_QTY": 0,
        "STATUS": "Out of Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844107",
        "SKU_ID": "110844107",
        "SELLER_SKU": "NLSBG517-24M",
        "AGE": "517-24M",
        "STOCK_QTY": 1,
        "STATUS": "In Stock"
      }
    ]
  },
  {
    "STYLE": "34405878",
    "STYLE_NAME": "Lilly and Sid Unisex Kids Striped Cotton Dungaree",
    "BRAND": "Lilly and sid",
    "MRP": 1899,
    "GENDER":"Boy",
    "CATEGORY": "Dungaree",
    "IMAGE_URL": "product_img/Lilly-and-Sid-Unisex-Kids-Striped-Cotton-Dungaree.jpg",
    "VARIANTS": [
      {
        "SKU_CODE": "LLSIDNGR110844114",
        "SKU_ID": "110844114",
        "SELLER_SKU": "NLSBB523-03M",
        "AGE": "523-03M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844115",
        "SKU_ID": "110844115",
        "SELLER_SKU": "NLSBB523-06M",
        "AGE": "523-06M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844116",
        "SKU_ID": "110844116",
        "SELLER_SKU": "NLSBB523-12M",
        "AGE": "523-12M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844117",
        "SKU_ID": "110844117",
        "SELLER_SKU": "NLSBB523-18M",
        "AGE": "523-18M",
        "STOCK_QTY": 3,
        "STATUS": "In Stock"
      },
      {
        "SKU_CODE": "LLSIDNGR110844118",
        "SKU_ID": "110844118",
        "SELLER_SKU": "NLSBB523-24M",
        "AGE": "523-24M",
        "STOCK_QTY": 2,
        "STATUS": "In Stock"
      }
    ]
  }

];

// Data Import Function
const importData = async () => {
  try {
    // 1. Purana data saaf karo (Optional)
    await Product.deleteMany();
    console.log('Old Data Destroyed...');

    // 2. Naya Data Daalo
    await Product.insertMany(products);
    console.log('✅ Data Imported Successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();