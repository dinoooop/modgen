<x-mail::message>
    <h1>Reset your password</h1>
    <p>Hi {{ $user->name }},</p>
    <p>Found a request to reset your password at {{ config('app.name') }}.</p>
    <p>Simply click on the button to set up a new password for your account.</p>
    <p>If you didn’t request for password reset, just ignore this email.</p>
    <x-mail::button url="{{ config('app.url') . '/reset-password/' . $user->process_link }}">Reset Password</x-mail::button>
</x-mail::message>