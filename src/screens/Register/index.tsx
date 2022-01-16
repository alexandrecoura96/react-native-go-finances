import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { ButtonForms } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionsTypes,
} from "./styles";
import { FormData } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import "intl";
import { useAuth } from "../../hooks/auth";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  ammount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor deve ser preenchido"),
});

export function Register() {
  const [onTransactionType, setOnTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelected(type: "positive" | "negative") {
    setOnTransactionType(type);
  }

  function triggerModalOpen() {
    setCategoryModalOpen(true);
  }

  function triggerModalClose() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!onTransactionType)
      return Alert.alert("Selecione o tipo da transação!");
    if (category.key === "category")
      return Alert.alert("Selecione a categoria!");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      ammount: form.ammount,
      type: onTransactionType,
      category: category.key,
      date: new Date(),
    };
    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setOnTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="characters"
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="ammount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.ammount && errors.ammount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="up"
                onPress={() => handleTransactionTypeSelected("positive")}
                isActive={onTransactionType === "positive"}
              />
              <TransactionTypeButton
                title="Outcome"
                type="down"
                onPress={() => handleTransactionTypeSelected("negative")}
                isActive={onTransactionType === "negative"}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={triggerModalOpen}
            />
          </Fields>
          <ButtonForms title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={triggerModalClose}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
