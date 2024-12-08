// import { useToast } from "@chakra-ui/react";
// import swal from "sweetalert";

// export default async function DisplayError(
//   title,
//   id,
//   path,
//   historyHook,
//   timer,
// ) {
//   const erreurMessage = "Une erreur est survenue ,veuillez réessayer ";
//   const linkToDetails = path + id;

//   function redirect() {
//     historyHook.replace(linkToDetails);
//   }

//   const toast = useToast();
//   const value = toast({
//     title: title ? title : erreurMessage,
//     status: "warning",
//     colorScheme: "red",
//     duration: timer ? timer : 3000,
//     isClosable: true,
//   });
// }
