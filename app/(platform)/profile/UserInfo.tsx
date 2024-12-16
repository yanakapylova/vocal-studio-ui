import { useSelector } from "react-redux";
import styles from "./page.module.scss";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { format } from "date-fns";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.users.activeUser);

  useEffect(() => {
    console.log(user?.birthdate);
    console.log(typeof user?.birthdate);
  }, [user]);

  return user ? (
    <div className={styles.profileSettings}>
      <div className={`${styles.field} ${styles.name}`}>
        <div>
          {user.name} {user.surname}
        </div>
        <div className={styles.role}>
          {user.role == "student" ? "Ученик" : "Учитель"}
        </div>
      </div>

      <div className={styles.field}>
        <b>Дата рождения:</b> {format(new Date(user.birthdate), "dd-MM-yyyy")}
      </div>

      <div className={styles.field}>
        <b>E-mail:</b> {user.email}
      </div>

      <div className={styles.field}>
        <b>Группа:</b> {user.groups[0].name}
      </div>
    </div>
  ) : (
    <div>Авторизуйтесь</div>
  );
};

export default UserInfo;
