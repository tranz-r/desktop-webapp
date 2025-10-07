import { AdminLayout } from '../../components/layout/admin-layout';

export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
