<template>
  <div class="w-full bg-gray-50">
    <div class="w-full max-w-7xl mx-auto">
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
      >
        <a-form-item label="Radio">
          <a-radio-group v-model:value="radioValue">
            <a-radio value="apple">Apple</a-radio>
            <a-radio value="pear">Pear</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="Input">
          <a-input />
        </a-form-item>
        <a-form-item label="Select">
          <a-select v-model:value="selectValue">
            <a-select-option value="demo">Demo</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="TreeSelect">
          <a-tree-select
            :tree-data="treeData"
            v-model:value="treeSelectValue"
          />
        </a-form-item>
        <a-form-item label="Cascader">
          <a-cascader :options="options" v-model:value="cascaderValue" />
        </a-form-item>
        <a-form-item label="DatePicker">
          <a-date-picker v-model:value="datePickerValue" />
        </a-form-item>
        <a-form-item label="RangePicker">
          <a-range-picker v-model:value="rangePickerValue" />
        </a-form-item>
        <a-form-item label="InputNumber">
          <a-input-number v-model:value="inputNumberValue" />
        </a-form-item>
        <a-form-item label="TextArea">
          <a-textarea :rows="4" v-model:value="textAreaValue" />
        </a-form-item>
        <a-form-item label="Switch">
          <a-switch v-model:checked="switchValue" />
        </a-form-item>
        <a-form-item label="Upload">
          <a-upload action="/upload.do" list-type="picture-card">
            <div>
              <PlusOutlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="Button">
          <a-button>Button</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

export default {
  data() {
    return {
      componentDisabled: false,
      labelCol: {
        style: {
          width: "150px",
        },
      },
      wrapperCol: {
        span: 14,
      },
      radioValue: "apple",
      treeData: [
        {
          title: "Light",
          value: "light",
          children: [
            {
              title: "Bamboo",
              value: "bamboo",
            },
          ],
        },
      ],
      options: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
            },
          ],
        },
      ],
      checked: false,
      checkboxValue: false,
      selectValue: "demo",
      treeSelectValue: "bamboo",
      cascaderValue: ["zhejiang", "hangzhou"],
      datePickerValue: null,
      rangePickerValue: null,
      inputNumberValue: 0,
      textAreaValue: "",
      switchValue: false,
    };
  },
  methods: {
    handleCheckboxChange(checked) {
      this.componentDisabled = checked;
    },
  },
};
</script>

<!-- <script>
const storageRef = ref(storage, `files/${Date.now()}_${file.name}`);
try {
  const snapshot = await uploadBytes(storageRef, file);
  const fileURL = await getDownloadURL(snapshot.ref);
  const ordersRef = collection(db, "gallery");
  const querySnapshot = await getDocs(ordersRef);
  const newId = querySnapshot.size;
  const newDocRef = doc(ordersRef, newId);

  await setDoc(newDocRef, {
    id: newId,
    product_id: selectedItem.product_id,
    image: fileURL,
    title: galleryTitles,
    text: galleryInfos,
  });
} catch (error) {
  console.log("Admin Panel: " + error);
}
</script> -->
