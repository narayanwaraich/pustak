import Folders from '@/features/Folders';
import Bookmarks from '@/features/Bookmarks';
import HitAndTrial from '@/components/hit-n-trial';

export const DashboardRoute = () => {
  return (
    <>
      <HitAndTrial />
      <Folders />
      <Bookmarks />
    </>
  );
};
