import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://giftapp-dev-qa.myshopify.com/api/2024-01/graphql.json',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': '6f98f9f363a11507e2d7be0a7619d136'  },

});

export default apiClient;