import Card from "../../ui/Card/Card";
import styles from "./UserList.module.scss";
import Button from "../../ui/Button/Button";
import type { User } from "../../../types/types";

type UserListProps = {
  users: User[];
  nextUrl: boolean;
  handleShowMore: () => void;
};

export default function UserList({
  users,
  nextUrl,
  handleShowMore,
}: UserListProps) {
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
      {nextUrl && (
        <Button
          disabled={false}
          text="Show more"
          onClick={handleShowMore}
          type="button"
        />
      )}
    </div>
  );
}
