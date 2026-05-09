import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  selectedCategory = 'all';
  cartCount = 0;

  products: Product[] = [
    {
      id: 1,
      name: 'UltraBoost Running Shoes',
      price: 129.99,
      category: 'footwear',
      image: 'https://picsum.photos/id/20/400/300',
      description: 'Lightweight, responsive cushioning for maximum energy return. Perfect for marathons.',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Cotton Blend T-Shirt',
      price: 24.99,
      category: 'clothing',
      image: 'https://picsum.photos/id/26/400/300',
      description: 'Soft, breathable fabric with a modern fit. Available in 5 colors.',
    },
    {
      id: 3,
      name: 'SmartWatch Pro',
      price: 199.99,
      category: 'electronics',
      image: 'https://picsum.photos/id/0/400/300',
      description: 'Track your fitness, receive notifications, and more. 5-day battery life.',
      badge: 'New'
    },
    {
      id: 4,
      name: 'Denim Jacket',
      price: 89.99,
      category: 'clothing',
      image: 'https://picsum.photos/id/20/400/300',
      description: 'Classic style, durable denim. Perfect for any casual occasion.',
    },
    {
      id: 5,
      name: 'Wireless Earbuds',
      price: 59.99,
      category: 'electronics',
      image: 'https://picsum.photos/id/1/400/300',
      description: 'Crystal clear sound, 24h battery life with charging case. IPX4 water resistant.',
      badge: 'Sale'
    },
    {
      id: 6,
      name: 'Leather Boots',
      price: 149.99,
      category: 'footwear',
      image: 'https://picsum.photos/id/20/400/300',
      description: 'Genuine leather, weather-resistant. Handcrafted for durability and style.',
    },
    {
      id: 7,
      name: 'Gaming Mouse',
      price: 39.99,
      category: 'electronics',
      image: 'https://picsum.photos/id/0/400/300',
      description: 'RGB lighting, 16000 DPI, programmable buttons. Ergonomic design.',
    },
    {
      id: 8,
      name: 'Wool Sweater',
      price: 59.99,
      category: 'clothing',
      image: 'https://picsum.photos/id/26/400/300',
      description: 'Merino wool, soft and warm. Perfect for winter.',
    }
  ];

  get filteredProducts() {
    if (this.selectedCategory === 'all') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: Product) {
    this.cartCount++;
    alert(`🛒 Added ${product.name} to cart!\n\nTotal items in cart: ${this.cartCount}`);
  }

  getBadgeColor(badge: string): string {
    switch(badge) {
      case 'Best Seller': return 'bg-yellow-500';
      case 'New': return 'bg-green-500';
      case 'Sale': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  }
}
