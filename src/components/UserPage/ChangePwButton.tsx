import useModal from "@/hooks/useModal";
import { ButtonPlain } from "../ui/Buttons";
import ChangePwForm from "./ChangePwForm";

export default function ChangePwButton({userData}) {
  const { openModal } = useModal();
  
  const openChange = () => {
    openModal({
      modal: {
        // title01: "비밀번호 바꾸기",
        // title02:  "비밀번호 바꾸기",
        content: <ChangePwForm/>,
        onConfirm: () => {
          console.log("확인 클릭됨");
        },
        onCancel: () => {
          console.log("취소 클릭됨");
        },
        confirmButton: "확인",
        cancelButton: "닫기",
      },
    });
  };

  return <ButtonPlain text="비밀번호 바꾸기" onClick={openChange} />;
}
