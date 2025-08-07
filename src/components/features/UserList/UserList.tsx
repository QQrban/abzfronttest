import Card from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import type { User } from "../../../types/types";

import styles from "./UserList.module.scss";

type UserListProps = {
  users: User[];
  nextUrl: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

export default function UserList({
  users,
  nextUrl,
  setPage,
  isLoading,
}: UserListProps) {
  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.userListWrapper}>
      <h1>Working with GET request</h1>

      <div className={styles.userListCardContainer}>
        {users.map((user) => (
          <Card
            key={user.id}
            photo={user.photo}
            name={user.name}
            position={user.position}
            email={user.email}
            phone={user.phone}
          />
        ))}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        nextUrl && (
          <Button
            disabled={false}
            text="Show more"
            onClick={handleShowMore}
            type="button"
            className={styles.wideButton}
          />
        )
      )}
    </div>
  );
}
