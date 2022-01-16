import React from "react";
import { FlatList } from "react-native";
import { ButtonForms } from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from "./styles";
import { CategoryProps, ICategorySelect } from "./types";

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: ICategorySelect) {
  function handleCategoryItem(category: CategoryProps) {
    setCategory(category);
  }
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategoryItem(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name} </Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <ButtonForms
          title="Selecionar"
          onPress={() => {
            closeSelectCategory();
          }}
        />
      </Footer>
    </Container>
  );
}
