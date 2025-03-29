// import { useEffect } from "react";
// import useModal from "../../../public/hooks/useModal";
// import Modal from "../Modal";
// import { ButtonPlain } from "../Buttons";

// type CommentModifyProps = {
//   comment: string;
//   setComment: (value: string) => void;
// };

// export default function CommentModify({ comment, setComment }: CommentModifyProps) {
//   const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } = useModal();

//   const handleReset = () => {
//     if (!comment) return;
//     openModal();
//   };

//   // 모달 확인 시 댓글 초기화
//   useEffect(() => {
//     if (isConfirmed) {
//       setComment("");
//     }
//   }, [isConfirmed, setComment]);

//   return (
//     <>
//       <ButtonPlain text="취소" onClick={handleReset} />
//       <Modal
//         isModalOpen={isModalOpen}
//         title01="잠깐!"
//         title02="모두 지울까요?"
//         btnPlainText="아니요"
//         btnStrongText="지울래요"
//         onClose={closeModal}
//         onConfirm={confirmModal}
//       />
//     </>
//   );
// }
