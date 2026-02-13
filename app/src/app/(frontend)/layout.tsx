/**
 * 前台 Layout
 * 包含 Navbar + Footer
 */

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<main style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>{children}</main>
			<Footer />
		</>
	);
}
