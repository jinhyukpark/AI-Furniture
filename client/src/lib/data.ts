import deskImage from '@assets/generated_images/modern_minimalist_white_desk_for_home_office.png';
import sofaImage from '@assets/generated_images/comfortable_beige_fabric_sofa.png';
import kidsBedImage from '@assets/generated_images/modern_kids_single_bed_white_wood.png';
import spaceRoomImage from '@assets/generated_images/space_themed_kids_bedroom_with_modern_furniture.png';

export const products = [
  {
    id: 1,
    name: "로이 모션 데스크",
    price: 459000,
    category: "서재",
    image: deskImage,
    description: "높이 조절이 가능한 스마트 모션 데스크입니다. 재택근무의 필수품.",
    features: ["높이 조절", "케이블 정리", "충돌 방지 센서"]
  },
  {
    id: 2,
    name: "코펜하겐 소파",
    price: 890000,
    category: "거실",
    image: sofaImage,
    description: "북유럽 스타일의 패브릭 소파. 발수 및 오염 방지 기능이 포함되어 있습니다.",
    features: ["아쿠아클린 패브릭", "모듈형 디자인", "고밀도 폼"]
  },
  {
    id: 3,
    name: "팅클 키즈 침대",
    price: 320000,
    category: "키즈룸",
    image: kidsBedImage,
    description: "우리아이 첫 침대로 안전하고 아늑합니다. 둥근 모서리로 안전을 더했습니다.",
    features: ["E0 등급 목재", "안전 가드", "저상형 디자인"]
  }
];

export const spaceConcept = {
  title: "우주 탐험가 룸",
  image: spaceRoomImage,
  description: "미래의 우주비행사를 꿈꾸는 아이를 위한 방입니다. 팅클 침대와 로이 데스크를 딥 스페이스 네이비 테마로 구성했습니다.",
  products: [1, 3], // Desk and Kids Bed
  totalPrice: 459000 + 320000 + 150000 // Added decoration cost
};
