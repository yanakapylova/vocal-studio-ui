import { Group } from "@/app/features/interfaces/Group";
import styles from "./page.module.scss";
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { deleteSchedule } from "@/app/features/schedulesSlice";
import { activities } from "./constants";

export const EventItem = ({ className, index, user, item }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={className} key={index + item.time}>
      <div className={styles.info}>
        <div className={styles.time}>{item.time}</div>
        <div className={styles.infoBox}>
          {user?.role == "teacher" && (
            <div className={styles.groups}>
              {item.groups?.map((group: Group) => {
                return <div key={group.name}>{group.name}</div>;
              })}
            </div>
          )}
          {item.type == "permanent" && (
            <div className={styles.activity}>
              {activities[item.activity as keyof typeof activities]}
            </div>
          )}
          <div className={styles.place}>{item.place}</div>
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => dispatch(deleteSchedule(item.id))}
        >
          &times; {/* Символ крестика */}
        </button>
      </div>
    </div>
  );
};
