<template>
  <el-dialog
    title="进度"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    top="34vh"
    width="730px"
  >
    <el-steps
      :active="activeStep"
      finish-status="success"
      process-status="finish"
      align-center
    >
      <el-step
        v-for="step in steps"
        :key="step"
        :title="step.title"
        :status="step.status"
        :description="step.desc"
      ></el-step>
    </el-steps>
    <template #footer>
      <div class="d-flex justify-content-center">
        <template v-if="operations && operations.length > -1">
          <el-button @click="changeStatus(0)" class="col-sm" type="primary"
            >接受</el-button
          >
          <el-button @click="changeStatus(1)" class="col-sm" type="warning"
            >时间不合适</el-button
          >
          <el-button @click="changeStatus(2)" class="col-sm" type="danger"
            >拒绝</el-button
          >
        </template>
        <el-button
          v-else
          type="primary"
          class="w-100"
          @click="clickConfirmHandler"
          >{{ activeStep === 0 ? "申 请" : "确 定" }}</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import { CandidateOperation, Link, Status } from "../common/constant";

const STEPS = [
  { title: "待申请", status: "", desc: "" },
  { title: "初筛", status: "", desc: "" },
  { title: "用人部门筛选", status: "", desc: "" },
  { title: "面试", status: "", desc: "" },
  { title: "offer 沟通", status: "", desc: "" },
  { title: "待入职", status: "", desc: "" },
];

const getStepDesc = (status: Status, interviewTime?: string) => {
  let desc = interviewTime ? interviewTime : "";

  if (status === Status.WAIT_FOR_INTERVIEW) desc += "（已接受）";
  if (status === Status.TIME_NOT_RIGHT) desc += "（已申请改期）";
  if (status === Status.BE_REJECTED) desc = "已拒绝";

  return desc;
};

export default defineComponent({
  props: ["modelValue", "time"],
  emit: ["update:modelValue"],
  setup(props, ctx) {
    const router = useRouter();
    const steps = ref(STEPS);
    const activeStep = ref<Link>(Link.NOT_APPLY);
    const operations = ref([]);

    //#region 时间处理程序
    // 获取进度、状态、操作
    const queryInfoAndSet = () =>
      axios
        .post("/api/candidate", {
          token: store.getToken(),
        })
        .then((res) => {
          const { data } = res;
          const {
            currentLink,
            status,
            operations: resOperations,
            interviewTime,
          } = data.candidate;

          if (currentLink) {
            activeStep.value = currentLink;

            if (currentLink === Link.INTERVIEW)
              steps.value[currentLink].desc = getStepDesc(
                status,
                new Date(interviewTime).toLocaleString()
              );
          }

          if (
            status &&
            (status === Status.OBSOLETE || status === Status.BE_REJECTED)
          )
            steps.value[currentLink].status = "error"; // 被淘汰

          if (resOperations !== undefined) operations.value = resOperations;
        })
        .catch(() => {
          // 未登录
          store.setToken("");
        });

    const clickConfirmHandler = () => {
      ctx.emit("update:modelValue", false);
      if (activeStep.value === Link.NOT_APPLY) router.push("/jobs");
    };

    const changeStatus = (operation: CandidateOperation) => {
      axios
        .post("/api/candidate/change-status", {
          token: store.getToken(),
          operation,
        })
        .then((res) => {
          if (res.data.success) queryInfoAndSet();
        })
        .catch(() => {
          store.setToken("");
        });
    };
    //#endregion

    queryInfoAndSet();

    return {
      steps,
      activeStep,
      operations,
      clickConfirmHandler,
      changeStatus,
    };
  },
});
</script>

<style></style>
