import React, { useState, useEffect } from "react";
import { StoreSelectorProps, Location, SelectedStore } from "./types";
import Tree from "../Tree";
import "./styles.scss";

const StoreSelector: React.FC<StoreSelectorProps> = ({
  visible,
  onClose,
  onSelect,
  maxSelection,
}) => {
  const [location, setLocation] = useState<Location>({
    province: null,
    city: null,
    district: null,
  });

  const [selectedStores, setSelectedStores] = useState<SelectedStore[]>([]);

  const [loading, setLoading] = useState({
    province: false,
    city: false,
    district: false,
    store: false,
  });

  // 模拟数据加载
  const mockLoadData = async (type: string, parentId?: string | number) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    await new Promise((resolve) => setTimeout(resolve, 500));

    let data;
    switch (type) {
      case "province":
        data = [
          { id: "p1", label: "北京市" },
          { id: "p2", label: "上海市" },
          { id: "p3", label: "广东省" },
        ];
        break;
      case "city":
        data = [
          { id: "c1", label: "北京市" },
          { id: "c2", label: "上海市" },
          { id: "c3", label: "广州市" },
        ];
        break;
      case "district":
        data = [
          { id: "d1", label: "朝阳区" },
          { id: "d2", label: "海淀区" },
          { id: "d3", label: "东城区" },
        ];
        break;
      case "store":
        data = [
          { id: "s1", label: "王府井门店", isLeaf: true },
          { id: "s2", label: "西单门店", isLeaf: true },
          { id: "s3", label: "三里屯门店", isLeaf: true },
        ];
        break;
      default:
        data = [];
    }

    setLoading((prev) => ({ ...prev, [type]: false }));
    return data;
  };

  useEffect(() => {
    if (visible) {
      loadProvinces();
    }
  }, [visible]);

  const loadProvinces = async () => {
    const provinces = await mockLoadData("province");
    setProvinceData(provinces);
  };

  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  const handleProvinceSelect = async (node: any) => {
    setLocation({ province: node, city: null, district: null });
    const cities = await mockLoadData("city", node.id);
    setCityData(cities);
    setDistrictData([]);
    setStoreData([]);
  };

  const handleCitySelect = async (node: any) => {
    setLocation((prev) => ({
      ...prev,
      city: node,
      district: null,
    }));
    const districts = await mockLoadData("district", node.id);
    setDistrictData(districts);
    setStoreData([]);
  };

  const handleDistrictSelect = async (node: any) => {
    setLocation((prev) => ({ ...prev, district: node }));
    const stores = await mockLoadData("store", node.id);
    setStoreData(stores);
  };

  const handleStoreSelect = (node: any) => {
    if (!location.province || !location.city || !location.district) return;

    setSelectedStores((prev) => {
      const isSelected = prev.some((item) => item.store.id === node.id);

      if (isSelected) {
        // 如果已选中，则取消选中
        return prev.filter((item) => item.store.id !== node.id);
      } else {
        // 如果未选中，则添加到选中列表
        if (maxSelection && prev.length >= maxSelection) {
          // 如果已达到最大选择数量，替换最早选择的
          const newSelected = [
            ...prev.slice(1),
            {
              store: node,
              location: {
                province: location.province,
                city: location.city,
                district: location.district,
              },
            },
          ];
          return newSelected;
        }

        return [
          ...prev,
          {
            store: node,
            location: {
              province: location.province,
              city: location.city,
              district: location.district,
            },
          },
        ];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedStores.length > 0) {
      onSelect(selectedStores.map((item) => item.store));
      onClose();
    }
  };

  const removeStore = (storeId: string | number) => {
    setSelectedStores((prev) =>
      prev.filter((item) => item.store.id !== storeId)
    );
  };

  if (!visible) return null;

  return (
    <div className="store-selector-overlay">
      <div className="store-selector-modal">
        <div className="store-selector-header">
          <h3>选择门店</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="store-selector-content">
          <div className="location-trees">
            <div className="tree-section">
              <h4>省份</h4>
              <Tree
                data={provinceData}
                selectedKey={location.province?.id}
                onSelect={handleProvinceSelect}
                loading={loading.province}
              />
            </div>
            <div className="tree-section">
              <h4>城市</h4>
              <Tree
                data={cityData}
                selectedKey={location.city?.id}
                onSelect={handleCitySelect}
                loading={loading.city}
              />
            </div>
            <div className="tree-section">
              <h4>区县</h4>
              <Tree
                data={districtData}
                selectedKey={location.district?.id}
                onSelect={handleDistrictSelect}
                loading={loading.district}
              />
            </div>
            <div className="tree-section">
              <h4>门店</h4>
              <Tree
                data={storeData}
                selectedKeys={selectedStores.map((item) => item.store.id)}
                onSelect={handleStoreSelect}
                loading={loading.store}
              />
            </div>
          </div>
          {selectedStores.length > 0 && (
            <div className="selected-stores">
              <h4>已选择的门店：</h4>
              <div className="store-tags">
                {selectedStores.map(({ store, location }) => (
                  <div key={store.id} className="store-tag">
                    <span className="location-path">
                      {location.province.label} / {location.city.label} /{" "}
                      {location.district.label} /
                    </span>
                    <span className="store-name">{store.label}</span>
                    <button
                      className="remove-store"
                      onClick={() => removeStore(store.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {maxSelection && (
                <div className="selection-limit">
                  最多可选 {maxSelection} 家门店（已选 {selectedStores.length}{" "}
                  家）
                </div>
              )}
            </div>
          )}
        </div>
        <div className="store-selector-footer">
          <button className="cancel-button" onClick={onClose}>
            取消
          </button>
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={selectedStores.length === 0}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreSelector;
