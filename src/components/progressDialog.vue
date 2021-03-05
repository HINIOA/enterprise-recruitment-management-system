<template>
  <el-dialog
    title="当前进度"
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
          <el-button
            @click="changeCandidateStatus(Operations.AGREE)"
            class="col-sm"
            type="primary"
            >接受</el-button
          >
          <el-button
            @click="changeCandidateStatus(Operations.REQUEST_RESCHEDULING)"
            class="col-sm"
            type="warning"
            >时间不合适</el-button
          >
          <el-button
            @click="changeCandidateStatus(Operations.REJECT)"
            class="col-sm"
            type="danger"
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
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../common/store";
import { Operations, Link, Status } from "../common/constant";
import { getCandidate, changeStatus } from "../api/candidate";

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
  props: ["modelValue"],
  emit: ["update:modelValue"],
  setup(props, ctx) {
    const router = useRouter();
    const steps = ref(STEPS);
    const activeStep = ref<Link>(Link.NOT_APPLY);
    const operations = ref([]);

    // 获取进度、状态、操作
    const queryInfoAndSet = () =>
      getCandidate(store.getToken())
        .then((data) => {
          const { success, candidate } = data
          const {
            currentLink,
            status,
            operations: resOperations,
            interviewTime,
          } = candidate;

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
          store.setToken("");
        });

    //#region 事件处理程序

    const clickConfirmHandler = () => {
      ctx.emit("update:modelValue", false);
      if (activeStep.value === Link.NOT_APPLY) router.push("/jobs");
    };

    const changeCandidateStatus = (operations: Operations) =>
      changeStatus(store.getToken(), operations)
        .then((data: any) => {
          if (data.success) queryInfoAndSet();
        })
        .catch(() => {
          store.setToken("");
        });

    //#endregion

    watch(() => props.modelValue, (_, newValue) => {
      if (!newValue) queryInfoAndSet();
    });

    queryInfoAndSet();

    return {
      steps,
      activeStep,
      operations,
      Operations,
      clickConfirmHandler,
      changeCandidateStatus,
    };
  },
});
</script>

<style></style>
