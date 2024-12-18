// HOOKS
import { useNavigate } from "react-router-dom";
import { IconButton, useToast } from "@chakra-ui/react";

// FIREBASE
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/userReducer";

// STYLE
import {
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";

// ICONS
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsGear } from "react-icons/bs";

const HeaderMenu = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.loggedInUser);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(logout(null));
      navigate("/auth/login");
    } catch (err) {
      toast({
        title: "Logout failed!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaRegUser />}
        letterSpacing="1px"
        color="#000"
        variant="ghost"
        size="md"
        fontWeight="normal"
        _hover={{
          bg: "lightgray",
        }}
      ></MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => navigate(user?.role === "admin" ? "/admin" : "/user")}
          variant="transparent"
          icon={<Icon h="15px" w="15px" as={BsGear} />}
          _hover={{
            bg: "lightgray",
          }}
        >
          {user.email && user.email.split("@")[0]}
        </MenuItem>
        <Divider />

        <MenuItem
          icon={<Icon h="15px" w="15px" as={FiLogOut} />}
          onClick={logoutHandler}
          _hover={{
            bg: "lightgray",
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
