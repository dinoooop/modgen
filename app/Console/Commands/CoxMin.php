<?php

namespace App\Console\Commands;

use App\Models\Module;
use App\Models\User;
use Illuminate\Console\Command;

class CoxMin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cox:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove other users record';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $ids = User::whereNotIn('id', [1])->pluck('id')->toArray();
        $this->info(implode(',', $ids));
        if(count($ids)){
            foreach ($ids as $key => $id) {
                User::find($id)->delete();
            }
        }

        return Command::SUCCESS;
    }
}
