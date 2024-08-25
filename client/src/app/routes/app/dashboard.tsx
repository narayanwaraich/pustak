import Sidebar from '@/features/Folders';
import Bookmarks from '@/features/Bookmarks';
import HitAndTrial from '@/components/hit-n-trial';

export const DashboardRoute = () => {
  return (
    <>
      <HitAndTrial />
      <Sidebar />
      <Bookmarks />
    </>
  );
};
