<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const { footer, global } = useAppConfig();
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const mobile = breakpoints.smaller("lg");
import { motion } from "motion-v";
defineProps<{
  page: IndexCollectionItem;
}>();
const animation = useState("bgAnimation", () => true);
const currentTime = ref(Date.now());
type Timer = ReturnType<typeof setInterval> | null;
let timer: Timer = null;

const updateTime = () => {
  currentTime.value = Date.now();
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 60000);
});

onUnmounted(() => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
});

const user = ref({
  name: "@ROOT",
  location: "KATOWICE",
  available: true,
});

const items = computed(() => [
  [
    {
      label: user.value.name,

      type: "label",
    },
  ],
  [
    {
      label: "Animacja tła",
      icon: "i-lucide-play",
      type: "checkbox" as const,
      checked: animation.value,
      onUpdateChecked(checked: boolean) {
        animation.value = checked;
      },
      onSelect(e: Event) {
        e.preventDefault();
      },
    },
  ],

  [
    user.value.name === "@ROOT"
      ? {
          label: "Logout",
          icon: "i-lucide-log-out",

          onSelect() {
            user.value = {
              name: "@ANONYMOUS",
              location: "UNKNOWN",
              available: false,
            };
          },
        }
      : {
          label: "Login",
          icon: "i-lucide-log-in",
          onSelect() {
            user.value = {
              name: "@ROOT",
              location: "KATOWICE",
              available: true,
            };
          },
        },
  ],
]);
</script>

<template>
  <div class="relative p-0 overflow-hidden w-full lg:h-[800px] h-[700px]">
    <ClientOnly>
      <LazyLandingFaultyTerminal
        class="w-full h-full relative overflow-hidden [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        :scale="mobile ? 1.5 : 2"
        :grid-mul="mobile ? [1, 1] : [3, 1]"
        :digit-size="1.2"
        :time-scale="0.4"
        :pause="!animation"
        :scanline-intensity="0.3"
        :glitch-amount="3"
        :flicker-amount="1"
        :noise-amp="1"
        :chromatic-aberration="5"
        :dither="1"
        :curvature="mobile ? 0.05 : 0.1"
        tint="#05453B"
        :page-load-animation="false"
        :brightness="1"
      />
    </ClientOnly>
    <div class="absolute inset-0 z-1 flex flex-col">
      <div
        class="relative w-full before:border-y before:absolute before:inset-0 before:border-(--line-b-color)"
      >
        <div
          class="mx-4 lg:max-w-6xl h-18 lg:h-10 lg:mx-auto px-2 py-2 flex justify-between border border-(--line-b-color)"
        ></div>
      </div>
      <div
        class="relative w-full before:border before:border-t-0 before:border-x-0 before:absolute before:inset-0 before:border-(--line-b-color)"
      >
        <div
          class="lg:max-w-6xl z-10 relative mx-4 lg:mx-auto flex justify-between border border-t-0 border-(--line-b-color)"
        >
          <DotElement />
          <div
            class="px-2 py-2 border-r border-(--line-b-color) min-w-44 pointer-events-auto"
          >
            <UDropdownMenu :items="items" class="pointer-events-auto">
              <MonoBagde>
                <div
                  class="text-persian-green-500 cursor-pointer inline-flex items-center uppercase"
                >
                  Settings <Icon name="lucide-chevron-down" />
                </div>
              </MonoBagde>
            </UDropdownMenu>
          </div>
          <div
            class="px-2 py-2 border-l border-(--line-b-color) min-w-44 text-right"
          >
            <MonoBagde>
              <NuxtTime
                class="mr-2"
                :datetime="Date.now()"
                month="short"
                day="numeric"
                locale="pl-PL"
              />
              <ClientOnly>
                <NuxtTime
                  :key="currentTime"
                  :datetime="currentTime"
                  hour="2-digit"
                  minute="2-digit"
                  locale="pl-PL"
                />
              </ClientOnly>
            </MonoBagde>
          </div>
        </div>
      </div>
      <div
        class="w-full max-w-6xl mx-auto relative grow flex flex-col lg:border-x border-(--line-b-color) justify-center items-center"
      >
        <div
          class="absolute mx-auto lg:inset-0 inset-x-4 lg:max-w-4xl border-(--line-b-color) border-x pointer-events-none h-full lg-max:hidden"
        ></div>
        <div
          class="isolate relative text-center py-10 w-full border-y border-(--line-b-color)"
        >
          <div
            class="absolute select-none mx-4 inset-0 max-w-4xl lg:mx-auto font-normal font-[none] text-5xl text-persian-green-100"
          >
            <CrossElement is-cross />
          </div>
          <div>
            <motion.div
              class="mb-4 flex items-center justify-center"
              :initial="{
                scale: 1.1,
                opacity: 0,
                filter: 'blur(20px)',
              }"
              :animate="{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              }"
              :transition="{
                duration: 0.6,
                delay: 0.1,
              }"
            >
              <UAvatar
                class="size-20 ring ring-default ring-offset-3 ring-offset-(--ui-bg)"
                :src="global.picture?.light!"
                :alt="global.picture?.alt!"
              />
            </motion.div>
            <motion.h1
              class="tracking-tight font-bold text-highlighted text-pretty text-3xl sm:text-4xl lg:text-5xl text-shadow-md max-w-lg mx-auto"
              :initial="{
                scale: 1.1,
                opacity: 0,
                filter: 'blur(20px)',
              }"
              :animate="{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              }"
              :transition="{
                duration: 0.6,
                delay: 0.1,
              }"
            >
              {{ page.title }}
            </motion.h1>
            <motion.div
              :initial="{
                scale: 1.1,
                opacity: 0,
                filter: 'blur(20px)',
              }"
              :animate="{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              }"
              :transition="{
                duration: 0.6,
                delay: 0.3,
              }"
              class="text-md mx-auto max-w-2xl sm:text-md text-balance mt-6 text-white/80"
            >
              {{ page.description }}
            </motion.div>
          </div>
          <div class="mt-10">
            <div
              class="flex flex-wrap gap-x-6 gap-y-3 mt-4 flex-col justify-center items-center"
            >
              <Motion
                :initial="{
                  scale: 1.1,
                  opacity: 0,
                  filter: 'blur(20px)',
                }"
                :animate="{
                  scale: 1,
                  opacity: 1,
                  filter: 'blur(0px)',
                }"
                :transition="{
                  duration: 0.6,
                  delay: 0.5,
                }"
              >
                <div v-if="page.hero.links" class="flex items-center gap-2">
                  <UButton
                    class="relative group/item"
                    color="neutral"
                    variant="outline"
                    :to="`mailto:${global.email}`"
                  >
                    <div
                      class="contents *:z-10 *:size-2 *:absolute *:border-persian-green-200 *:group-hover/item:scale-130 *:transition-all *:duration-300 *:ease-in-out"
                    >
                      <div class="border-t border-l left-0 top-0"></div>
                      <div class="border-t border-r right-0 top-0"></div>
                      <div class="border-b border-l left-0 bottom-0"></div>
                      <div class="border-b border-r right-0 bottom-0"></div>
                    </div>
                    {{ page.hero.links[0]?.label }}</UButton
                  >
                </div>
              </Motion>
              <div class="gap-x-4 inline-flex mt-4">
                <Motion
                  v-for="(link, index) of footer?.links"
                  :key="index"
                  :initial="{
                    scale: 1.1,
                    opacity: 0,
                    filter: 'blur(20px)',
                  }"
                  :animate="{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                  }"
                  :transition="{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                  }"
                >
                  <UButton
                    class="font-black"
                    v-bind="{
                      size: 'md',
                      color: 'neutral',
                      variant: 'ghost',
                      ...link,
                    }"
                  />
                </Motion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative pb-10 w-full before:border before:border-b-0 before:border-x-0 before:absolute before:inset-0 before:border-(--line-b-color)"
      >
        <div
          class="absolute m-auto inset-x-4 top-0 lg:max-w-6xl border-(--line-b-color) border-x pointer-events-none h-full lg-max:hidden"
        ></div>
        <div
          class="relative lg:max-w-6xl mx-4 lg:mx-auto flex justify-between border border-(--line-b-color)"
        >
          <DotElement />
          <div class="px-2 py-2 border-r border-(--line-b-color)">
            <MonoBagde>LOCATION: {{ user.location }}</MonoBagde>
          </div>
          <div class="px-2 py-2 border-l border-(--line-b-color)">
            <MonoBagde
              >STATUS:
              <span
                :class="
                  global.available && user.available
                    ? 'text-persian-green-500'
                    : 'text-error'
                "
              >
                <span class="relative size-2 inline-flex">
                  <span
                    class="absolute inline-flex size-full rounded-full opacity-75"
                    :class="
                      global.available && user.available
                        ? 'bg-persian-green-500 animate-ping'
                        : 'bg-error'
                    "
                  />
                  <span
                    class="relative inline-flex size-2 scale-90 rounded-full"
                    :class="
                      global.available && user.available
                        ? 'bg-persian-green-500'
                        : 'bg-error'
                    "
                  />
                </span>
                {{
                  global.available && user.available ? "AVAILABLE" : "OFFLINE"
                }}</span
              >
            </MonoBagde>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-border {
  border-color: var(--ui-fab-b-color);
  border-width: 1px;
}
:inside-b:before {
  content: var(--tw-content);
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  border-width: 1px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.6, 0.6, 0, 1);
  transition-duration: 0.2s;
}
</style>
