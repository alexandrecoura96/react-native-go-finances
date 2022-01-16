import React from "react";
import { View, Text } from "react-native";
import { date } from "yup/lib/locale";
import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Ammount,
  Category,
  Icon,
  Footer,
  CategoryName,
  Date,
} from "./styles";
import { ITransactionProps } from "./types";

export default function TransactionCard({ data }: ITransactionProps) {
  const [category] = categories.filter(
    (item: any) => item.key === data.category
  );

  return (
    <Container>
      <Title>{data.name}</Title>
      <Ammount type={data.type}>
        {data.type === "negative" && "- "}
        {data.ammount}
      </Ammount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
