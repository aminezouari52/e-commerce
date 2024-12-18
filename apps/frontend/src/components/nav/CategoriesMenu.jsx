// HOOKS
import { useState, useEffect } from "react";

// FUNCTIONS
import { getCategories } from "@/functions/category";

// STYLE
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

// ASSETS
import { ChevronDownIcon } from "@chakra-ui/icons";

function CategoriesMenu() {
  const [categories, setCategories] = useState([]);
  const loadCategories = async () => {
    const response = await getCategories();
    setCategories(response?.data);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Menu>
      <MenuButton
        display={{ sm: "none", md: "flex" }}
        bg="none"
        p={2}
        borderRadius="md"
        letterSpacing="2px"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize={{ sm: "sm", lg: "md" }}
        _hover={{ bg: "lightgray" }}
        _expanded={{ bg: "lightgray" }}
      >
        Categories <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        {categories?.map((category) => {
          return (
            <MenuItem
              key={category._id}
              _hover={{
                bg: "lightgray",
              }}
            >
              {category.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default CategoriesMenu;
