import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Testimonial Carousel Demo',description:'Accessible React testimonial component with fictional sample data.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
