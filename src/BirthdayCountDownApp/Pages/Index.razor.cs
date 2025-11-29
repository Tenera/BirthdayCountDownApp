using Microsoft.JSInterop;

namespace BirthdayCountDownApp.Pages;

public partial class Index
{
    private readonly int _birthdayMonth = 12; // month (1-12)
    private readonly int _birthdayDay = 16; // day (1-31)
    private bool _hasStartedConfetti = false;
    
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (!_hasStartedConfetti && DaysUntilBirthday() == 0)
        {
            try
            {
                await JS.InvokeVoidAsync("app.startConfetti");
                _hasStartedConfetti = true;
            }
            catch
            {
            }
        }
    }

    private DateOnly NextBirthday()
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var year = today.Year;
        var candidate = new DateOnly(year, _birthdayMonth, _birthdayDay);
        if (candidate < today) candidate = new DateOnly(year + 1, _birthdayMonth, _birthdayDay);
        return candidate;
    }

    private int DaysUntilBirthday()
    {
        var today = DateOnly.FromDateTime(DateTime.Now);
        var next = NextBirthday();
        return (next.ToDateTime(new TimeOnly(0, 0)) - today.ToDateTime(new TimeOnly(0, 0))).Days;
    }
}