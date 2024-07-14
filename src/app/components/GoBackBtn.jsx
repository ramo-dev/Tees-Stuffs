import { useRouter } from 'next/navigation';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipProvider, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"

const GoBackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
          <div className="absolute md:left-12 mt-4 ms-4">
<TooltipProvider>
          <Tooltip>
            <TooltipTrigger>

                      <button
                onClick={handleGoBack}
                className="border border-2 border-white bg-black w-max text-3xl rounded-full text-white rounded-full"
                >
                  <IoArrowBackCircleSharp/>
              </button>
              </TooltipTrigger>
    <TooltipContent asChild>
      <p>Go Back</p>
    </TooltipContent>

          </Tooltip>
    </TooltipProvider>


          </div>
      );
};

export default GoBackButton;

