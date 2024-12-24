<template>
  <div className="pt-5">
    <v-breadcrumbs :items="['Admin', 'Quản lý']"></v-breadcrumbs>
    <div className='w-full'>
      <div className='flex h-[40%] justify-evenly items-center'>
        <div className='bg-black w-[34%] h-[83%] rounded-3xl text-white flex flex-col justify-center gap-5 pl-[2%]'>
          <div className='flex items-center'>
            <IoBagHandle className='text-4xl bg-gray-400 p-1 rounded-xl '/>
            <div className='pl-5'>
              <div className='text-2xl font-bold'>Doanh số</div>
              <div className='text-gray-500'>731 Đơn hàng</div>
            </div>
            <div className='pl-[44%]'><IoIosArrowForward /></div>
          </div>
          <div className='flex items-center text-3xl font-bold'>
            <MdAttachMoney className='text-4xl'/>
            <span id="doanhSo">9,324.53</span>
          </div>
          <div className='flex items-center gap-[40%]'>
            <div className='flex items-center'><FaArrowTrendUp /> +15.6%</div>
            <div className='flex gap-2'>+1.4K <div className='text-gray-400'> trong tuần</div></div>
          </div>
        </div>

        <div className='bg-white w-[34%] h-[83%] rounded-3xl flex flex-col justify-center gap-5 pl-[2%] border border-gray-900 '>
          <div className='flex items-center'>
            <FaUser className='text-4xl bg-gray-400 p-2 rounded-xl '/>
            <div className='pl-5'>
              <div className='text-2xl font-bold'>Người dùng</div>
              <div className='text-gray-500'>Trung bình: 9:40m</div>
            </div>
            <div className='pl-[40%]'><IoIosArrowForward /></div>
          </div>
          <div className='flex items-center text-3xl font-bold'>
            <span id="nguoiDung">12,302</span>
          </div>
          <div className='flex items-center gap-[40%]'>
            <div className='flex items-center'><FaArrowTrendUp /> +12.7%</div>
            <div className='flex gap-2'>+1.7K <div className='text-gray-400'> this week</div></div>
          </div>
        </div>

        <div className='bg-white w-[24%] h-[83%] rounded-3xl flex flex-col justify-center gap-5 pl-[2%] border border-gray-900'>
          <div className='flex items-center'>
            <FaBoxOpen className='text-4xl bg-gray-400 p-2 rounded-xl '/>
            <div className='pl-5'>
              <div className='text-2xl font-bold'>Đơn hàng</div>
              <div className='text-gray-500'>2 đơn đã gửi</div>
            </div>
            <div className='pl-[20%]'><IoIosArrowForward /></div>
          </div>
          <div className='flex items-center text-3xl font-bold'>
            <span id="donHang">1,254</span>
          </div>
          <div className='flex items-center gap-[50%]'>
            <div className='flex items-center'><FaArrowTrendDown /> -12.7%</div>
            <div className='flex gap-2 font-semibold'>-213</div>
          </div>
        </div>
      </div>
    </div>
    <div className="shlied">
      <Chart/>
    </div>
  </div>
</template>

<script setup>
import Chart from '@/components/Chart.vue';
import { onMounted } from 'vue';
import { CountUp } from 'countup.js';

onMounted(() => {
  const doanhSoCountUp = new CountUp('doanhSo', 9324.53);
  const nguoiDungCountUp = new CountUp('nguoiDung', 12302);
  const donHangCountUp = new CountUp('donHang', 1405);

  if (!doanhSoCountUp.error) {
    doanhSoCountUp.start();
  } else {
    console.error(doanhSoCountUp.error);
  }

  if (!nguoiDungCountUp.error) {
    nguoiDungCountUp.start();
  } else {
    console.error(nguoiDungCountUp.error);
  }

  if (!donHangCountUp.error) {
    donHangCountUp.start();
  } else {
    console.error(donHangCountUp.error);
  }
});
</script>
<style scoped>
.shlied {
  width: 100%;
  margin-top: 30px;
  height: 350px;
}
</style>