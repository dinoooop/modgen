<x-mail::message>
    <h1>Verify Your Email</h1>
    <p>Hi {{ $user->name }},</p>
    <p>Welcome to {{ config('app.name') }}.</p>
    <p>Before using the app, please verify your email by clicking following button.</p>
    <x-mail::button url="{{ config('app.url') . '/welcome/' . $user->process_link }}">VERIFY</x-mail::button>
</x-mail::message>