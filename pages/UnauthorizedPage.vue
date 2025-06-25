<template>
  <UError
    :error="{
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'you donot login yet.',
    }"
    redirect="/admin/auth"
    :ui="{ statusMessage: 'text-primary' }"
  />
</template>
