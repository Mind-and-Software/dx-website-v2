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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface DeleteDialogProps {
  deleteAccount: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ deleteAccount }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are about to delete your account.
          </AlertDialogTitle>
          <AlertDialogDescription>
            <b>This will remove the following:</b>
            <ul>
              <li>Your account with associated email address and password.</li>
              <li>Data that you have submitted using the app.</li>
            </ul>
            <b>This will not remove:</b>
            <ul>
              <li>
                Data that has been exported for research studies. This data is
                used in anonymous form only and your identity will never be
                revealed in public.
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAccount()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteDialog;
