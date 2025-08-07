import { useEffect, useState } from "react";
import * as yup from "yup";

import InputField from "../../ui/InputField/InputField";
import RadioButton from "../../ui/RadioButton/RadioButton";
import UploadField from "../../ui/UploadField/UploadField";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import type { UserForm } from "../../../types/types";
import { validateForm } from "./validateForm";
import { getPositions, getToken, submitUser } from "./formApi";
import { parseYupErrors } from "./parseYupErrors";

import styles from "./SignUpForm.module.scss";

interface Position {
  id: number;
  name: string;
}

interface SignUpFormProps {
  userForm: UserForm;
  setUserForm: React.Dispatch<React.SetStateAction<UserForm>>;
  setUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpForm({
  userForm,
  setUserForm,
  setUserAdded,
}: SignUpFormProps) {
  const [positions, setPositions] = useState<Position[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [resetFile, setResetFile] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPositions().then((data: Position[]) => {
      setPositions(data);
      if (userForm.position_id === 0 && data.length > 0) {
        setUserForm((prev) => ({
          ...prev,
          position_id: data[0].id,
        }));
      }
    });
  }, [setUserForm, userForm.position_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  const handlePositionChange = (value: string) => {
    setUserForm({ ...userForm, position_id: Number(value) });
  };

  const handleFileChange = (file: File | null) => {
    setUserForm({ ...userForm, photo: file });
  };

  useEffect(() => {
    const isComplete =
      userForm.name.trim() !== "" &&
      userForm.email.trim() !== "" &&
      userForm.phone.trim() !== "" &&
      userForm.position_id > 0 &&
      userForm.photo !== null;

    setIsFormValid(isComplete);
  }, [userForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formToValidate = {
      name: userForm.name,
      email: userForm.email,
      phone: userForm.phone,
      position_id: userForm.position_id,
      image: userForm.photo,
    };

    try {
      await validateForm.validate(formToValidate, { abortEarly: false });
      setIsLoading(true);

      const token = await getToken();
      const result = await submitUser(userForm, token);

      if (result.success) {
        setFormErrors({});

        setUserForm({
          name: "",
          email: "",
          phone: "",
          position_id: positions[0]?.id || 0,
          photo: null,
        });

        setResetFile(true);
        setUserAdded(true);
        setApiError("");
      } else {
        setApiError(result.message);
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setFormErrors(parseYupErrors(err));
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signUpFormWrapper}>
      <h1>Working with POST request</h1>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <InputField
              label="Your name"
              name="name"
              value={userForm.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <InputField
              label="Email"
              name="email"
              type="text"
              value={userForm.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <InputField
              helperText={
                formErrors.phone
                  ? formErrors.phone
                  : "+38 (XXX) XXX - XX - XX"
              }
              label="Phone"
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
            />
            <div className={styles.signUpFormPosition}>
              <div>Select your position</div>
              <div className={styles.signUpFormPositionsListContainer}>
                {positions.map((position) => (
                  <RadioButton
                    key={position.id}
                    id={position.id}
                    name="position"
                    value={String(position.id)}
                    checked={userForm.position_id === position.id}
                    label={position.name}
                    onChange={handlePositionChange}
                  />
                ))}
              </div>
            </div>
            <UploadField
              reset={resetFile}
              error={!!formErrors.image}
              helperText={formErrors.image}
              onFileChange={handleFileChange}
            />
          </>
        )}
        {apiError ? (
          <div className={styles.signUpFormError}>{apiError}</div>
        ) : (
          ""
        )}
        <Button type="submit" text="Sign up" disabled={!isFormValid} />
      </form>
    </div>
  );
}
