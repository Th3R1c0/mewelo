import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useAuthModal from "@/hooks/useAuthModal";

interface ModalProps {
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  exitModal: any,
  isOpen: boolean,
}
  
const Modal: React.FC<ModalProps> = ({
  onChange,
  title,
  description,
  children,
  exitModal,
  isOpen
}) => {
  
  console.log("isopen: ", isOpen);

  return (
    <AlertDialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      
      <AlertDialogContent className="max-h-full h-full bg-black md:h-auto md:max-h-[85vh] w-full md:w-[90wv] md:max-w-[450px] rounded-md ">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={exitModal}
            className="text-black bg-gray-700 border-none hover:bg-gray-700 w-full hover:text-white"
          >
            Cancel
          </AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
