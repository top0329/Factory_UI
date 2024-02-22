import robot from './assets/svg/robot.svg';
import CoreRoutes from './routes';
import DefaultBlueprintCard from './components/Cards/BlueprintCard/default';
import { MyBlueprintCard } from './components/Cards/BlueprintCard/mycard';
import { MyOwnBlueprintCard } from './components/Cards/BlueprintCard/myown';
import { OwnBlueprintCard } from './components/Cards/BlueprintCard/own';
import { ProductBlueprintCard } from './components/Cards/BlueprintCard/product';
import { UserBlueprintCard } from './components/Cards/BlueprintCard/user';
import BlueprintInfoCard from './components/Cards/BlueprintInfoCard/BlueprintInfoCard';
import BlueprintUpdateCard from './components/Cards/BlueprintInfoCard/BlueprintUpdateCard';
import AdvancedFilter from './components/SearchBar/AdvancedFilter';
import SortBy from './components/SearchBar/SortBy';
function App() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <SortBy />

      <BlueprintUpdateCard />
      <BlueprintInfoCard />
      <AdvancedFilter />
      <ProductBlueprintCard
        imageLink="https://s3-alpha-sig.figma.com/img/1227/9881/7c4f8936a4246f91674d47fe40c14d63?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fZMf1NLUXLBL0whpRBoxaxVmW~CSdZJ8D~LVlqsDrc6XExG6tYQVfbqM-1jdBugVikABU9UhpX4TBpOzZRdPLK-UEmNMi4ELL6ooAgbNeG5Wa05zvsrgUxJE-2fd1Wjd2zCfjKKjBktjtLX3Rt~8GIUQHyepvdI-TGdbURvn4Rw8WLQFhosDE433k~OHyEr0npRUQEYAfjUfOucLD6uoe2yge9pMUTZA~Ati6FqR1m11LGVWJK9SSZjxS3O1IPZTtHu-S~u~29qJTwtpHmThgxzfZ7gk3Kf7G3Wne3hlmYLeQ-n6rtTPPWve3-k5MkF7oHoP2XhL86nKV2eNj1ba7g__"
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <MyOwnBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <OwnBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        address="0x55d398326f99059ff775485246999027b3197955"
      />

      <DefaultBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />

      <MyBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />

      <UserBlueprintCard
        imageLink={robot}
        name="Robot"
        blueprintid={28}
        tsupply={1000000000}
        mintPrice={0.001}
        mintLimit={100}
      />
    <CoreRoutes />

    </div>
  );
}

export default App;
