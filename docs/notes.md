"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Call backend /auth/login
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}


import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  const products = [
    { id: 1, name: "Sneakers", price: 1999 },
    { id: 2, name: "T-shirt", price: 599 },
  ];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">All Products</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Total Sales</h2>
            <p className="mt-2 text-2xl">₹1,20,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Orders</h2>
            <p className="mt-2 text-2xl">234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Users</h2>
            <p className="mt-2 text-2xl">85</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



/*
   Next.js 15 + App Router project skeleton for your e-commerce app.
   Includes:
   - Core shared components (Navbar, Footer, ProductCard)
   - Auth pages
   - Shop pages
   - Admin pages
   - Info pages
   - System pages

   NOTE: Each page is simplified boilerplate. You can extend logic with
   TanStack Query + Valibot + Express backend integration later.
*/

// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// app/page.tsx (redirect to homepage)
import { redirect } from "next/navigation";
export default function Page() {
  redirect("/products");
}

/* -------------------- COMPONENTS -------------------- */
// components/navbar.tsx
export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <h1 className="text-xl font-bold">MyShop</h1>
      <div className="space-x-4">
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}

// components/footer.tsx
export function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} MyShop. All rights reserved.
    </footer>
  );
}

// components/product-card.tsx
export function ProductCard({ product }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-500">₹{product.price}</p>
      <a
        className="mt-2 inline-block rounded bg-blue-600 px-3 py-1 text-white"
        href={`/products/${product.id}`}
      >
        View
      </a>
    </div>
  );
}

/* -------------------- AUTH PAGES -------------------- */
// app/(auth)/login/page.tsx
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-xl font-bold">Login</h1>
        <input
          className="w-full rounded border p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded bg-blue-600 p-2 text-white">
          Sign In
        </button>
      </div>
    </div>
  );
}

/* -------------------- SHOP PAGES -------------------- */
// app/(shop)/products/page.tsx
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  const products = [
    { id: 1, name: "Sneakers", price: 1999 },
    { id: 2, name: "T-shirt", price: 599 },
  ];
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">All Products</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// app/(shop)/cart/page.tsx
export default function CartPage() {
  return <div className="p-6">Your cart is empty.</div>;
}

// app/(shop)/checkout/page.tsx
export default function CheckoutPage() {
  return <div className="p-6">Checkout form here</div>;
}

/* -------------------- ADMIN PAGES -------------------- */
// app/(admin)/dashboard/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">Total Sales: ₹1,20,000</div>
        <div className="rounded bg-white p-4 shadow">Orders: 234</div>
        <div className="rounded bg-white p-4 shadow">Users: 85</div>
      </div>
    </div>
  );
}

/* -------------------- INFO PAGES -------------------- */
// app/(info)/about/page.tsx
export default function AboutPage() {
  return <div className="p-6">About our shop...</div>;
}

// app/(info)/contact/page.tsx
export default function ContactPage() {
  return <div className="p-6">Contact us form...</div>;
}

/* -------------------- SYSTEM PAGES -------------------- */
// app/(system)/not-found.tsx
export default function NotFound() {
  return <div className="flex h-screen items-center justify-center">404 | Not Found</div>;
}

// app/(system)/error.tsx
"use client";
export default function Error({ error }: { error: Error }) {
  return <div className="p-6 text-red-500">Error: {error.message}</div>;
}

// app/(system)/maintenance/page.tsx
export default function MaintenancePage() {
  return <div className="flex h-screen items-center justify-center">We'll be back soon!</div>;
}
