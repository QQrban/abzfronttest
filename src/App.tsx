import { useEffect, useRef, useState } from "react";

import Header from "./components/Header/Header";
import Banner from "./components/features/Banner/Banner";
import UserList from "./components/features/UserList/UserList";
import SignUpForm from "./components/features/SignUpForm/SignUpForm";

import type { User, UserForm } from "./types/types";

import styles from "./App.module.scss";

import successImage from "./assets/success-image.svg";

const initialForm: UserForm = {
  name: "",
  email: "",
  phone: "",
  position_id: 0,
  photo: null,
};

function App() {
  const [userForm, setUserForm] = useState<UserForm>(initialForm);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [userAdded, setUserAdded] = useState(false);
  const [successImg, setSuccesImg] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const userFormRef = useRef<HTMLDivElement | null>(null);
  const userListRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = async (pageToFetch: number) => {
    setIsLoadingUsers(true);

    try {
      const response = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageToFetch}&count=6`
      );
      const data = await response.json();

      setUsers((prev) =>
        pageToFetch === 1 ? data.users : [...prev, ...data.users]
      );
      setNextUrl(data.links.next_url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (userAdded) {
      fetchUsers(1);
      setSuccesImg(true);
      setUserAdded(false);
    }
  }, [userAdded]);

  const scrollToSection = (section: "users" | "signup") => {
    const sectionRef = section === "users" ? userListRef : userFormRef;
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header onNavigate={scrollToSection} />
      <main>
        <Banner onNavigate={scrollToSection} />
        <div className={styles.contentWrapper}>
          <div ref={userListRef}>
            <UserList
              setPage={setPage}
              users={users}
              nextUrl={!!nextUrl}
              isLoading={isLoadingUsers}
            />
          </div>
          <div ref={userFormRef}>
            {successImg ? (
              <div className={styles.successImageContainer}>
                <h1>User successfully registered</h1>
                <img src={successImage} alt="" />
              </div>
            ) : (
              <SignUpForm
                setUserAdded={setUserAdded}
                userForm={userForm}
                setUserForm={setUserForm}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
