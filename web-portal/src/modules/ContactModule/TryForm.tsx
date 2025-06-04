"use client";
import { Reducer, useReducer } from "react";
import { useTranslations } from "next-intl";

import { Button, Fieldset, Flex, Form, Input, Title } from "~components";

import {
  Action,
  ContactActionKey,
  contactActions,
  ContactForm,
  contactForm,
  contactReducer,
} from "./reducer";
import style from "./style";

/**
 * TryForm
 * @description
 * The Main contact form
 *
 */
function TryForm() {
  const t = useTranslations();
  const [state, dispatch] = useReducer<Reducer<ContactForm, Action>>(
    contactReducer,
    contactForm
  );
  return (
    <Flex as="section" flexStyle={style.tryForm}>
      <Title className="bg hollow" as="h2">
        {t("ASK_DEMO")}
      </Title>
      <Form className="bg-primary color-secondary shadow-hight">
        {Object.keys(contactActions).map((act) => (
          <Fieldset key={act} legend={t(act)}>
            <Input
              value={state[contactActions[act as ContactActionKey]]}
              onChange={(str) =>
                dispatch({
                  payload: str as string,
                  type: contactActions[act as ContactActionKey],
                })
              }
            />
          </Fieldset>
        ))}
        <Button icon="Drafts" label={t("SEND")} />
      </Form>
    </Flex>
  );
}
export default TryForm;
