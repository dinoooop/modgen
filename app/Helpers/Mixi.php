<?php

namespace App\Helpers;

use App\Helpers\Comcal\Comcal;

class Mixi
{

    public static function status($context = null)
    {
        switch ($context) {


            case 'user':
                return [
                    1 => 'active', // verified
                    2 => 'inactive', // not verified
                    3 => 'suspend', // user suspended
                ];

            case 'module':
                return [
                    1 => 'active',
                    2 => 'inactive',
                ];

            default:
                return [
                    1 => 'active',
                    2 => 'suspended'
                ];

        }
    }


    public static function weekday()
    {
        return [
            1 => 'mon',
            2 => 'tue',
            3 => 'wed',
            4 => 'thu',
            5 => 'fri',
            6 => 'sat',
            7 => 'sun',
        ];
    }

    public static function gender()
    {
        return [
            1 => 'male',
            2 => 'female',
            3 => 'transgender'
        ];
    }



    public static function month()
    {
        return [
            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sept',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec',
        ];
    }

}