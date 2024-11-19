import UserAvatar from "@/features/user/components/UserAvatar";
import SkeletonText from "../../Skeletons/SkeletonText";
import { Card } from "@/components/ui/card";

export const Loading = () => {
  return (
    <div className="py-4">
      <Card className="overflow-hidden p-4 relative">
        <div className="mt-10 xs:mt-4">
          <UserAvatar width={48} height={48} showName />
          <div className="ml-16">
            <div className="mt-2">
              <div className="text-gray-500">
                <SkeletonText width="100px" height="1rem" />
              </div>
            </div>
            <div className="text-gray-500 mt-2 font-semibold">
              <SkeletonText width="80px" height="1rem" />
            </div>
            <div className="mt-4 mb-8">
              <SkeletonText width="100%" height="1rem" className="mb-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
