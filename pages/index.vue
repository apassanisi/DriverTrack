<template>
  <div class="p-6 bg-white rounded-lg shadow-lg space-y-6 sm:p-8 md:p-10 lg:p-12 max-w-3xl mx-auto">
    <h1 class="text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl text-dark-gray">Welcome to DriverTrack</h1>
    <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl text-dark-gray">Follow the steps below to get started:</p>
    <ol class="list-decimal list-inside space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
      <li>
        <NuxtLink to="/auth" class="text-blue-600 hover:underline">Sign Up or Log In</NuxtLink> to create or access your account.
      </li>
      <li>
        <NuxtLink to="/runs/create" class="text-blue-600 hover:underline">Create a New Run</NuxtLink> to add a new run to the system.
      </li>
      <li>
        <NuxtLink to="/runs" class="text-blue-600 hover:underline">View Runs</NuxtLink> to explore all available runs.
      </li>
      <li>
        <NuxtLink to="/assignments" class="text-blue-600 hover:underline">Assign a Driver</NuxtLink> to assign a driver to a run.
      </li>
      <li>
        <NuxtLink to="/assignments" class="text-blue-600 hover:underline">View Assignments</NuxtLink> to see all driver assignments.
      </li>
      <li>
        <NuxtLink to="/assignments" class="text-blue-600 hover:underline">Update Assignment Status</NuxtLink> to mark an assignment as complete.
      </li>
      <li>
        <NuxtLink to="/performance" class="text-blue-600 hover:underline">View Performance</NuxtLink> to check driver performance metrics.
      </li>
    </ol>
  </div>
</template>
